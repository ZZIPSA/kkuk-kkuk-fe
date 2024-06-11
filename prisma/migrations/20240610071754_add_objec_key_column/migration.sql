/*
  Warnings:

  - Added the required column `objectKey` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stamp" ADD COLUMN     "objectKey" TEXT NOT NULL;
