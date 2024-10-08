import { Prisma } from "@prisma/client";
import { v4 as uuid } from "uuid";
import type { UserCreationBody, RichUser, User, UserEmailVerificationBody, UserInfoUpdateBody } from "~/types/user";
import { InvalidVerificationCodeError, UserNotFoundError } from "~/types/user";
import prisma from "~/server/database";
import { UniqueConstraintError } from "~/types/errors";
import { hash } from "~/server/services/encryption";

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
export async function recoverUserByLogin(login: string): Promise<RichUser> {
  const user = await prisma.user.findUnique({
    where: {
      login,
    },
    include: {
      userInfo: true,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user as RichUser;
}
export async function recoverUserByEmail(email: string): Promise<RichUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      userInfo: true,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user as RichUser;
}
export async function recoverUserPassword(uid: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      uid,
    },
    select: {
      password: true,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user.password;
}
export async function verifyEmail(body: UserEmailVerificationBody): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      uid: body.userUid,
      verifiedAt: null,
    },
  });
  if (!user) throw new UserNotFoundError();
  if (user.verificationCode !== body.code) throw new InvalidVerificationCodeError();
  return await prisma.user.update({
    data: {
      verifiedAt: new Date(),
    },
    where: {
      uid: body.userUid,
    },
    include: {
      userInfo: true,
    },
  }) as User;
}
export async function updatePassword(uid: string, newPassword: string): Promise<User> {
  const user = await prisma.user.update({
    where: {
      uid,
    },
    data: {
      password: await hash(newPassword),
    },
    include: {
      userInfo: true,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user as User;
}
export async function updateUserEmail(uid: string, email: string): Promise<RichUser> {
  const user = await prisma.user.update({
    where: {
      uid,
    },
    data: {
      email,
      verificationCode: uuid(),
      verifiedAt: null,
    },
    include: {
      userInfo: true,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user as RichUser;
}
export async function updateUserInfo(uid: string, info: UserInfoUpdateBody): Promise<User> {
  await prisma.userInfo.update({
    where: {
      userUid: uid,
    },
    data: info,
  });
  return await recoverUser(uid);
}
export async function deleteAccount(uid: string) {
  if (!await recoverUser(uid)) throw new UserNotFoundError();
  await prisma.user.delete({
    where: {
      uid,
    },
  });
}
