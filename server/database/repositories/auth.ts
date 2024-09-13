import type { AuthSession, AuthSessionCreationBody, AuthSessionRecoverBody } from "~/types/auth";
import { AuthSessionNotFoundError, sessionDuration } from "~/types/auth";
import prisma from "~/server/database";

export async function isAuthenticated(payload: AuthSessionRecoverBody): Promise<boolean> {
  try {
    return !!await recoverAuthSession(payload);
  }
  catch (e) {
    console.log(e);
    return false;
  }
}
export async function createAuthSession(payload: AuthSessionCreationBody): Promise<AuthSession> {
  return await prisma.authSession.create({
    data: {
      user: {
        connect: {
          uid: payload.userUid,
        },
      },
      expiresAt: new Date(Date.now() + (payload.keep ? sessionDuration.week : sessionDuration.hour)),
    },
  });
}
export async function recoverAuthSession(payload: AuthSessionRecoverBody): Promise<AuthSession> {
  const session = await prisma.authSession.findUnique({
    where: {
      authToken_userUid: {
        authToken: payload.authToken,
        userUid: payload.userUid,
      },
      expiresAt: {
        gt: new Date(),
      },
    },
  });
  if (!session) throw new AuthSessionNotFoundError();
  return session;
}
export async function prunedExpiredAuthSessions() {
  await prisma.authSession.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
}
