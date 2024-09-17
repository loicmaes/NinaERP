import type { ResetPasswordBody } from "~/types/user";
import { resetUserPassword, useProtectedBehavior } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  await useProtectedBehavior(event, async (userUid) => {
    const body = await readBody<ResetPasswordBody>(event);

    if (!body.currentPassword) return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Ton mot de passe actuel manque à l'appel !",
    }));
    if (!body.newPassword) return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Ton nouveau mot de passe manque à l'appel !",
    }));

    return await resetUserPassword(event, userUid, body);
  });
});
