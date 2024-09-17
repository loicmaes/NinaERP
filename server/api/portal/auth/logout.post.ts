import { useProtectedBehavior } from "~/server/services/auth";
import { deleteCurrentSession } from "~/server/database/repositories/auth";
import { authTokenCookie, userUidCookie } from "~/utils/constants";

export default defineEventHandler(async (event) => {
  await useProtectedBehavior(event, async (userUid) => {
    const authToken = getCookie(event, authTokenCookie);
    if (!authToken) return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Le token d'authentification est manquant !",
    }));
    await deleteCurrentSession(authToken, userUid);

    setCookie(event, authTokenCookie, "");
    setCookie(event, userUidCookie, "");
  });
});
