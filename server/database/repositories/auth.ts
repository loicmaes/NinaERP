import type { AuthSession, AuthSessionCreationBody } from "~/types/auth";
import { sessionDuration } from "~/types/auth";
import prisma from "~/server/database";

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
