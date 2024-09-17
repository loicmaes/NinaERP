import { useProtectedBehavior, verifyUserEmailAddress } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  return await useProtectedBehavior(event, async (userUid: string) => {
    const code = getRouterParam(event, "code");
    if (!code) return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Le code de vérification n'a pas été fourni !",
    }));

    return await verifyUserEmailAddress({
      userUid,
      code,
    });
  });
});
