/*
  Warnings:

  - Added the required column `blurredImage` to the `Kit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kit" ADD COLUMN     "blurredImage" TEXT NOT NULL;
