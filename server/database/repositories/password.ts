import type { PasswordResetRq, PasswordResetRqCreationBody } from "~/types/user";
import prisma from "~/server/database";

const requestLifeTime = 15 * 60 * 1000;

export async function hasRunningRequest(userUid: string): Promise<boolean> {
  return !!await prisma.passwordResetRequest.findUnique({
    where: {
      userUid,
    },
  });
}
export async function deleteRunningRequest(userUid: string) {
  await prisma.passwordResetRequest.delete({
    where: {
      userUid,
    },
  });
}
export async function createResetRequest(body: PasswordResetRqCreationBody): Promise<PasswordResetRq> {
  return await prisma.passwordResetRequest.create({
    data: {
      ...body,
      expiresAt: new Date(Date.now() + requestLifeTime),
    },
  });
}
export async function isValidRequest(uid: string): Promise<boolean> {
  return !!await prisma.passwordResetRequest.findUnique({
    where: {
      uid,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
}
