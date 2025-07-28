/*
  Warnings:

  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "price",
ADD COLUMN     "totalPrice" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" INTEGER NOT NULL;
