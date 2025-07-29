-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_bookId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
