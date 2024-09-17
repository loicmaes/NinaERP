import { authTokenCookie, userUidCookie } from "~/utils/constants";
import { whoAmI } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, authTokenCookie);
  const userUid = getCookie(event, userUidCookie);

  if (!authToken || !userUid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "Le cookie d'authentification ou de l'utilisateur n'a pas été fournis !",
  }));

  return await whoAmI(event, {
    authToken,
    userUid,
  });
});
