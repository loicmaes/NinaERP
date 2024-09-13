import type { H3Event } from "h3";
import type { User, UserCreationBody } from "~/types/user";
import { createUser, recoverUser } from "~/server/database/repositories/user";
import { UniqueConstraintError } from "~/types/errors";
import { createAuthSession, recoverAuthSession } from "~/server/database/repositories/auth";
import userVerificationCode from "~/server/email/templates/userVerificationCode";
import { sendMail } from "~/server/services/email";
import type { AuthSession, AuthSessionRecoverBody } from "~/types/auth";
import { authTokenCookie, userUidCookie } from "~/utils/constants";
import { AuthSessionNotFoundError } from "~/types/auth";
import { UserNotFoundError } from "~/types/user";

const authCookieParams = {
  path: "/",
  httpOnly: true,
  secure: true,
};

export function setAuthCookies(event: H3Event<Request>, session: AuthSession) {
  setCookie(event, authTokenCookie, session.authToken, authCookieParams);
  setCookie(event, userUidCookie, session.userUid, authCookieParams);
}

export async function registerUser(event: H3Event<Request>, payload: UserCreationBody): Promise<User | undefined> {
  try {
    const user = await createUser(payload);
    const code = user.verificationCode;

    const template = userVerificationCode(code);
    sendMail({
      to: user.email,
      subject: "Vérification de votre compte",
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
