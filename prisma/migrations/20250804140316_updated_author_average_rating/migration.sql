/*
  Warnings:

  - You are about to drop the column `averageRating` on the `book` table. All the data in the column will be lost.
  - The `authorAverageRating` column on the `book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "averageRating",
DROP COLUMN "authorAverageRating",
ADD COLUMN     "authorAverageRating" DECIMAL(3,2);
