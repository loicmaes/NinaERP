import type { UserCreationBody } from "~/types/user";
import { registerUser } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<UserCreationBody>(event);
  const user = await registerUser(event, body);
  if (!user) return sendError(event, createError({
    statusCode: 500,
    statusMessage: "Une erreur est survenue lors de la création de l'utilisateur !",
  }));
  return user;
});
