/*
  Warnings:

  - You are about to drop the column `author` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `user` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_bookId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "author",
DROP COLUMN "description",
DROP COLUMN "shipping",
DROP COLUMN "title",
ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bookId";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
