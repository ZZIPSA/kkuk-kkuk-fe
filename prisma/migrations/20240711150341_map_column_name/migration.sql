/*
  Warnings:

  - You are about to drop the column `completionDate` on the `Rally` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rally" DROP COLUMN "completionDate",
ADD COLUMN     "completedDate" TIMESTAMP(3);
