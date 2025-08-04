import { Body, ForbiddenException, Injectable, NotFoundException, Param, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateBookDto } from "./dto/create-book.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { EditBookDto } from "./dto/edit-book.dto";
import { PaginationDto } from "./dto/pagination-book.dto";
import { Prisma } from "generated/prisma";

@Injectable()
export class BookService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createBook(dto: CreateBookDto) {
        try {
            const book = await this.prisma.book.create({
                data: {
                    title: dto.title,
                    author: dto.author,
                    description: dto.description,
                    publish_Year: dto.publish_Year,
                    edition: dto.edition,
                    publisher: dto.publisher,
                    price: dto.price,
                    Stock: dto.stock
                }
            })

            return {
                message: 'Book created successfully', status: 'success',
                book
            }


        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Invalid User');
            }
            throw error;
        }

    }

    async getBook(dto: EditBookDto) {

        const book = await this.prisma.book.findFirst({
            where: {
                id: dto.id,
                deletedAt: null
            },
        });
        if (!book) {
            throw new NotFoundException("Book doesn't Exist")
        }

        const sum_of_rating = await this.prisma.feedback.aggregate({
            _sum: {
                rating: true,
            }, where: {
                bookId: dto.id
            }
        })
        const total_rating = await this.prisma.feedback.count({
            where: {
                bookId: dto.id
            }
        })

        const totalRatingValue = sum_of_rating._sum.rating ?? 0;
        const averageRating = total_rating > 0
            ? new Prisma.Decimal(totalRatingValue).div(total_rating)
            : new Prisma.Decimal(0);

        console.log("🚀 ~ BookService ~ getBook ~ averageRating:", averageRating)
        await this.prisma.book.update({
            where: {
                id: dto.id
            },
            data: {
                numberOfRating: total_rating,
                averageRating: averageRating,
            }
        });


        return {
            data:
                book
        }
    }

    async getBooks(dto: PaginationDto) {
        const total = await this.prisma.book.count({
            where: {
                deletedAt: null,
                title: {
                    search: dto.search,
                },
            },
        });

        const skip = (dto.page - 1) * dto.limit;
        const totalPages = Math.ceil(total / dto.limit);
        // console.log("🚀 ~ BookService ~ getBooks ~ totalPages:", totalPages)
        const books = await this.prisma.book.findMany({
            skip: skip,
            where: {
                deletedAt: null,
                title: {
                    search: dto.search,
                },
            },
            take: dto.limit,
        })
        return {
            total: total,
            total_Pages: totalPages,
            data:
                books
        }
    }

    async updateBook(dto: EditBookDto) {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                id: dto.id,
                deletedAt: null
            },
        });
        if (!existingBook) {
            throw new NotFoundException("Book doesn't Exist")
        }
        const updatedBook = await this.prisma.book.update({
            where: {
                id: dto.id,
                deletedAt: null
            },
            data: {
                title: dto.title,
                author: dto.author,
                description: dto.description,
                publish_Year: dto.publish_Year,
                edition: dto.edition,
                publisher: dto.publisher,
                price: dto.price,
                Stock: dto.stock
            }
        })
        return {
            message: 'Book updated successfully', status: 'success',
            data:
                updatedBook

        }
    }

    async deleteBook(dto: EditBookDto) {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                id: dto.id,
                deletedAt: null // Only fetch non-deleted books
            },
        });

        if (!existingBook) {
            throw new NotFoundException("Book doesn't exist or already deleted");
        }

        const softDeletedBook = await this.prisma.book.update({
            where: {
                id: dto.id
            },
            data: {
                deletedAt: new Date()
            },
        });

        return {
            message: 'Book deleted successfully',
            status: 'success',
            data: softDeletedBook
        };
    }

}