-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publish_Year" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
