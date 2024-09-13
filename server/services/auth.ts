import type { H3Event } from "h3";
import type { User, UserCreationBody } from "~/types/user";
import { createUser } from "~/server/database/repositories/user";
import { UniqueConstraintError } from "~/types/errors";
import { createAuthSession } from "~/server/database/repositories/auth";
import userVerificationCode from "~/server/email/templates/userVerificationCode";
import { sendMail } from "~/server/services/email";

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

    await createAuthSession({
      userUid: user.uid,
    });
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
