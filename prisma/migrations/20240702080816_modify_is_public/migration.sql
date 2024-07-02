/*
  Warnings:

  - You are about to drop the column `is_public` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "is_public",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;
