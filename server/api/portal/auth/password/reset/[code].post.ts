import { tryToUpdateUserPassword } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "code");
  const { newPassword } = await readBody<{ newPassword: string }>(event);
  if (!code) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "Le code doit être fourni !",
  }));
  return await tryToUpdateUserPassword(event, code, newPassword);
});
