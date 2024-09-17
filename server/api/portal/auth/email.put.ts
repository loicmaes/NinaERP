import { updateEmail, useProtectedBehavior } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  return await useProtectedBehavior(event, async (userUid) => {
    const { email } = await readBody<{
      email: string;
    }>(event);
    if (!email) return sendError(event, createError({
      statusCode: 400,
      statusMessage: "L'adresse e-mail est requise.",
    }));

    return await updateEmail(event, userUid, email);
  }, true);
});
