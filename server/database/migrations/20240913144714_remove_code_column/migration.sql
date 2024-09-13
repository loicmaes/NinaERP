/*
  Warnings:

  - You are about to drop the column `code` on the `passwordResetRequests` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "passwordResetRequests_code_key";

-- AlterTable
ALTER TABLE "passwordResetRequests" DROP COLUMN "code";
