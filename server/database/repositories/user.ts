import { Prisma } from "@prisma/client";
import type { UserCreationBody, RichUser, User } from "~/types/user";
import prisma from "~/server/database";
import { UniqueConstraintError } from "~/types/errors";
import { hash } from "~/server/services/encryption";
import { UserNotFoundError } from "~/types/user";

export async function createUser(payload: UserCreationBody): Promise<RichUser> {
  try {
    return await prisma.user.create({
      data: {
        ...payload,
        password: await hash(payload.password),
        userInfo: {
          create: {
            ...payload.userInfo,
            contactEmail: payload.userInfo.contactEmail ?? payload.email,
          },
        },
      },
      include: {
        userInfo: true,
      },
    }) as RichUser;
  }
  catch (e) {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError)) throw e;
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new UniqueConstraintError();
      default:
        throw e;
    }
  }
}
export async function recoverUser(userUid: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      uid: userUid,
    },
    include: {
      userInfo: true,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user as User;
}
