import { createPasswordResetRequest } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event);
  return await createPasswordResetRequest(event, body.email);
});
