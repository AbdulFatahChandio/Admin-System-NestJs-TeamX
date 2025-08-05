-- CreateTable
CREATE TABLE "author_Profile" (
    "authorId" SERIAL NOT NULL,
    "authorName" TEXT NOT NULL,
    "aboutAuthor" TEXT NOT NULL,
    "averageRating" DECIMAL(3,2) NOT NULL,
    "numberOfRating" INTEGER NOT NULL,

    CONSTRAINT "author_Profile_pkey" PRIMARY KEY ("authorId")
);
