-- AlterTable
CREATE SEQUENCE book_authorid_seq;
ALTER TABLE "book" ALTER COLUMN "authorId" SET DEFAULT nextval('book_authorid_seq');
ALTER SEQUENCE book_authorid_seq OWNED BY "book"."authorId";
