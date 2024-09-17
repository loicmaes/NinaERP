-- CreateTable
CREATE TABLE "passwordResetRequests" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordResetRequests_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwordResetRequests_userUid_key" ON "passwordResetRequests"("userUid");

-- CreateIndex
CREATE UNIQUE INDEX "passwordResetRequests_code_key" ON "passwordResetRequests"("code");

-- AddForeignKey
ALTER TABLE "passwordResetRequests" ADD CONSTRAINT "passwordResetRequests_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
