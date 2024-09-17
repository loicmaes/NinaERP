import { useProtectedBehavior } from "~/server/services/auth";
import { deleteAccount } from "~/server/database/repositories/user";
import { UserNotFoundError } from "~/types/user";

export default defineEventHandler(async (event) => {
  await useProtectedBehavior(event, async (userUid) => {
    try {
      await deleteAccount(userUid);
    }
    catch (e) {
      if (e instanceof UserNotFoundError) return sendError(event, createError({
        statusCode: 404,
        statusMessage: "L'utilisateur n'est pas trouvé !",
      }));
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: "Une erreur est survenue !",
      }));
    }
  }, true);
});
