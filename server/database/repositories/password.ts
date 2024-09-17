import type { PasswordResetRq, PasswordResetRqCreationBody } from "~/types/user";
import prisma from "~/server/database";
import { PasswordResetRqNotFoundError } from "~/types/user";

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
export async function recoverResetRequest(uid: string): Promise<PasswordResetRq> {
  const request = await prisma.passwordResetRequest.findUnique({
    where: {
      uid,
    },
  });
  if (!request) throw new PasswordResetRqNotFoundError();
  return request;
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
export async function pruneExpiredRequests() {
  await prisma.passwordResetRequest.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}
