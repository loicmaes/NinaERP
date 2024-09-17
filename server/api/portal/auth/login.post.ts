import type { UserLoginBody } from "~/types/user";
import { loginUser } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<UserLoginBody>(event);
  const user = await loginUser(event, body);
  if (!user) return sendError(event, createError({
    statusCode: 500,
    statusMessage: "Une erreur est survenue lors de la connexion de l'utilisateur !",
  }));
  return user;
});
