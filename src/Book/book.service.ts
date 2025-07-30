import { Body, ForbiddenException, Injectable, NotFoundException, Param, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateBookDto } from "./dto/create-book.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { EditBookDto } from "./dto/edit-book.dto";
import { PaginationDto } from "./dto/pagination-book.dto";

@Injectable()
export class BookService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createBook(@Body() dto: CreateBookDto) {
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

    async getBook(@Param() dto: EditBookDto) {

        const book = await this.prisma.book.findFirst({
            where: {
                id: dto.id,
                deletedAt: null
            },
        });
        if (!book) {
            throw new NotFoundException("Book doesn't Exist")
        }
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
        console.log("🚀 ~ BookService ~ getBooks ~ totalPages:", totalPages)
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

    async updateBook(@Body() dto: EditBookDto) {
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