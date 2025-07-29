/*
  Warnings:

  - Made the column `deletedAt` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book" ALTER COLUMN "deletedAt" SET NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT;
