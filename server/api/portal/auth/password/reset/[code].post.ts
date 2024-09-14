import { tryToUpdateUserPassword } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "code");
  const { newPassword } = await readBody<{ newPassword: string }>(event);
  return await tryToUpdateUserPassword(event, code, newPassword);
});
