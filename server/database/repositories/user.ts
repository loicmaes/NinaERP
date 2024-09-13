import { Prisma } from "@prisma/client";
import type { UserCreationBody, RichUser } from "~/types/user";
import prisma from "~/server/database";
import { UniqueConstraintError } from "~/types/errors";

export async function createUser(payload: UserCreationBody): Promise<RichUser> {
  try {
    return await prisma.user.create({
      data: {
        ...payload,
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
