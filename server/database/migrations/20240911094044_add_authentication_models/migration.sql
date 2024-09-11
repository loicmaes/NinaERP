-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "userInfos" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authSessions" (
    "authToken" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authSessions_pkey" PRIMARY KEY ("authToken","userUid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userInfos_userUid_key" ON "userInfos"("userUid");

-- AddForeignKey
ALTER TABLE "userInfos" ADD CONSTRAINT "userInfos_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authSessions" ADD CONSTRAINT "authSessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
