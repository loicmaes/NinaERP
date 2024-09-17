import type { H3Event } from "h3";
import type { ResetPasswordBody, User, UserCreationBody, UserEmailVerificationBody, UserLoginBody } from "~/types/user";
import {
  createUser,
  recoverUser,
  recoverUserByEmail,
  recoverUserByLogin, recoverUserPassword, updatePassword, updateUserEmail,
  verifyEmail,
} from "~/server/database/repositories/user";
import { UniqueConstraintError } from "~/types/errors";
import {
  createAuthSession,
  invalidateAllSessions,
  isAuthenticated,
  recoverAuthSession,
} from "~/server/database/repositories/auth";
import userVerificationCode from "~/server/email/templates/emailAddress/userVerificationCode";
import { sendMail } from "~/server/services/email";
import type { AuthSession, AuthSessionRecoverBody } from "~/types/auth";
import { authTokenCookie, userUidCookie } from "~/utils/constants";
import { AuthSessionNotFoundError } from "~/types/auth";
import { PasswordResetRqNotFoundError, UserNotFoundError } from "~/types/user";
import userEmailVerified from "~/server/email/templates/emailAddress/userEmailVerified";
import { verify } from "~/server/services/encryption";
import dontForgetToVerifyEmail from "~/server/email/templates/emailAddress/dontForgetToVerifyEmail";
import {
  createResetRequest,
  deleteRunningRequest,
  hasRunningRequest,
  isValidRequest, recoverResetRequest,
} from "~/server/database/repositories/password";
import passwordResetRequest from "~/server/email/templates/password/passwordResetRequest";
import passwordSuccessfullyReset from "~/server/email/templates/password/passwordSuccessfullyReset";
import securityEmailUpdate from "~/server/email/templates/emailAddress/securityEmailUpdate";
import emailUpdatedNeedVerification from "~/server/email/templates/emailAddress/emailUpdatedNeedVerification";

const authCookieParams = {
  httpOnly: true,
  secure: false, // TODO: true for prod environment
};

export function setAuthCookies(event: H3Event<Request>, session: AuthSession) {
  setCookie(event, authTokenCookie, session.authToken, authCookieParams);
  setCookie(event, userUidCookie, session.userUid, authCookieParams);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function useProtectedBehavior(event: H3Event<Request>, callback: (userUid: string) => Promise<any>, verified?: boolean) {
  const authToken = getCookie(event, authTokenCookie);
  const userUid = getCookie(event, userUidCookie);

  if (!authToken || !userUid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "Le cookie d'authentification ou de l'utilisateur n'a pas été fournis !",
  }));

  if (!await isAuthenticated({
    authToken,
    userUid,
  })) return sendError(event, createError({
    statusCode: 401,
    statusMessage: "Tu n'es pas connecté !",
  }));
  if (verified && !(await recoverUser(userUid)).verifiedAt) return sendError(event, createError({
    statusCode: 403,
    statusMessage: "Ton compte n'est pas vérifié !",
  }));

  return await callback(userUid);
}

export async function registerUser(event: H3Event<Request>, payload: UserCreationBody): Promise<User | undefined> {
  try {
    const user = await createUser(payload);
    const code = user.verificationCode;

    const template = userVerificationCode(code);
    sendMail({
      to: user.email,
      subject: "Vérification de ton compte",
      template,
    }).then();

    const session = await createAuthSession({
      userUid: user.uid,
    });
    setAuthCookies(event, session);
    return user;
  }
  catch (e) {
    if (e instanceof UniqueConstraintError) sendError(event, createError({
      statusCode: 409,
      statusMessage: "L'email ou l'identifiant est déjà utilisé !",
    }));
    return;
  }
}
export async function loginUser(event: H3Event<Request>, payload: UserLoginBody): Promise<User | undefined> {
  try {
    const user = await recoverUserByLogin(payload.login);
    if (!await verify(user.password, payload.password)) {
      sendError(event, createError({
        statusCode: 403,
        statusMessage: "Le mot de passe est incorrect !",
      }));
      return;
    }
    const session = await createAuthSession({
      userUid: user.uid,
      keep: !!user.verifiedAt && payload.keep,
    });
    setAuthCookies(event, session);

    if (!user.verifiedAt) sendMail({
      to: user.email,
      subject: "N'oublie pas de vérifier ton e-mail !",
      template: dontForgetToVerifyEmail(user.verificationCode),
    }).then();

    return user as User;
  }
  catch (e) {
    if (e instanceof UserNotFoundError) sendError(event, createError({
      statusCode: 404,
      statusMessage: "L'utilisateur n'existe pas !",
    }));
    else sendError(event, createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue !",
    }));
    return;
  }
}
export async function whoAmI(event: H3Event<Request>, payload: AuthSessionRecoverBody): Promise<User | undefined> {
  try {
    const session = await recoverAuthSession(payload);
    return await recoverUser(session.userUid);
  }
  catch (e) {
    if (e instanceof AuthSessionNotFoundError) sendError(event, createError({
      statusCode: 404,
      statusMessage: "La session a expirée !",
    }));
    if (e instanceof UserNotFoundError) sendError(event, createError({
      statusCode: 404,
      statusMessage: "L'utilisateur n'a pas été trouvé !",
    }));

    return;
  }
}

export async function verifyUserEmailAddress(body: UserEmailVerificationBody) {
  const user = await verifyEmail(body);
  sendMail({
    to: user.email,
    subject: "Félicitation 🎉",
    template: userEmailVerified(user.userInfo?.firstName ?? "undefined"),
  }).then();
  return user;
}

export async function createPasswordResetRequest(event: H3Event<Request>, email: string) {
  try {
    const user = await recoverUserByEmail(email);

    if (await hasRunningRequest(user.uid)) await deleteRunningRequest(user.uid);

    const rq = await createResetRequest({
      userUid: user.uid,
    });

    sendMail({
      to: user.email,
      subject: "Réinitialisation de ton mot de passe",
      template: passwordResetRequest(rq.uid),
    }).then();
  }
  catch (e) {
    if (e instanceof UserNotFoundError) return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Cet e-mail n'est lié à aucun utilisateur !",
    }));
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue !",
    }));
  }
}
export async function tryToUpdateUserPassword(event: H3Event<Request>, code: string, newPassword: string): Promise<User | undefined> {
  try {
    if (!await isValidRequest(code)) {
      sendError(event, createError({
        statusCode: 404,
        statusMessage: "La demande n'est pas valide !",
      }));
      return;
    }

    const request = await recoverResetRequest(code);
    const user = await updatePassword(request.userUid, newPassword);

    const session = await createAuthSession({
      userUid: user.uid,
    });
    setAuthCookies(event, session);
    sendMail({
      to: user.email,
      subject: "👏 Félicitation, mot de passe renouvelé !",
      template: passwordSuccessfullyReset(),
    }).then();

    return user;
  }
  catch (e) {
    if (e instanceof PasswordResetRqNotFoundError) {
      sendError(event, createError({
        statusCode: 404,
        statusMessage: "La requête n'a pas été trouvée ou n'existe pas !",
      }));
      return;
    }
    if (e instanceof UserNotFoundError) {
      sendError(event, createError({
        statusCode: 404,
        statusMessage: "L'utilisateur lié à cette requête n'a pas été trouvé ou n'existe plus !",
      }));
      return;
    }
    sendError(event, createError({
      statusCode: 500,
      statusMessage: "Une erreur s'est produite !",
    }));
    return;
  }
}
export async function resetUserPassword(event: H3Event<Request>, userUid: string, body: ResetPasswordBody) {
  try {
    const userPassword = await recoverUserPassword(userUid);
    if (!await verify(userPassword, body.currentPassword)) return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Le mot de passe n'est pas correcte !",
    }));
    if (body.newPassword === body.currentPassword) return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Tu ne peux pas mettre le même mot de passe !",
    }));
    await invalidateAllSessions(userUid);
    await updatePassword(userUid, body.newPassword);
    recoverUser(userUid).then((user: User) => sendMail({
      to: user.email,
      subject: "👏 Félicitation, mot de passe renouvelé !",
      template: passwordSuccessfullyReset(),
    }).then());
  }
  catch (e) {
    if (e instanceof UserNotFoundError) return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Utilisateur non trouvé !",
    }));
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue !",
    }));
  }
}

export async function updateEmail(event: H3Event<Request>, userUid: string, email: string): Promise<User | undefined> {
  try {
    const oldEmail = (await recoverUser(userUid)).email;
    if (oldEmail === email) {
      sendError(event, createError({
        statusCode: 409,
        statusMessage: "Tu ne peux pas ajouter la même email.",
      }));
      return;
    }
    const user = await updateUserEmail(userUid, email);

    sendMail({
      to: oldEmail,
      subject: "Alerte de sécurité 🛡️ Changement d'adresse e-mail",
      template: securityEmailUpdate(user.email),
    }).then();
    sendMail({
      to: user.email,
      subject: "Changement d'adresse e-mail : Nouvelle vérification requise",
      template: emailUpdatedNeedVerification(user.verificationCode),
    }).then();

    return user as User;
  }
  catch (e) {
    console.log(e);
    if (e instanceof UserNotFoundError) {
      sendError(event, createError({
        statusCode: 404,
        statusMessage: "L'utilisateur n'a pas été trouvé !",
      }));
      return;
    }
    sendError(event, createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue !",
    }));
    return;
  }
}
