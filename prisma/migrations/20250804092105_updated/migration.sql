/*
  Warnings:

  - You are about to alter the column `averageRating` on the `book` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "book" ALTER COLUMN "averageRating" DROP NOT NULL,
ALTER COLUMN "averageRating" DROP DEFAULT,
ALTER COLUMN "averageRating" SET DATA TYPE DECIMAL(3,2);
