/*
  Warnings:

  - Made the column `averageRating` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book" ALTER COLUMN "averageRating" SET NOT NULL;
