/*
  Warnings:

  - Made the column `thumbnailImage` on table `Kit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewardImage` on table `Kit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nickname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Kit" ALTER COLUMN "thumbnailImage" SET NOT NULL,
ALTER COLUMN "rewardImage" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nickname" SET NOT NULL;
