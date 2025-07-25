import { Body, ForbiddenException, Injectable, NotFoundException, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateBookDto } from "./dto/create-book.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { EditBookDto } from "./dto/edit-book.dto";
import { PaginationDto } from "./dto/pagination-book.dto";
import { Default_Page_Size } from "src/utils/constants";

@Injectable()
export class BookService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createBook(@Body() dto: CreateBookDto) {
        try {

            // console.log("🚀 ~ AuthService ~ signup ~ this.prisma:", this.prisma)
            const book = await this.prisma.book.create({
                data: {
                    title: dto.title,
                    author: dto.author,
                    description: dto.description,
                    publish_Year: dto.publish_Year,
                    edition: dto.edition,
                    publisher: dto.publisher
                }
            })
            // return user

            // return this.signToken(user.id, user.email); It returns only token
            return book
            // token: await this.signToken(user.id, user.email)

        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Invalid User');
            }
            throw error;
        }

    }

    async getBook(@Body() dto: EditBookDto) {

        const book = await this.prisma.book.findFirst({
            where: {
                id: dto.id
            },
        });
        if (!book) {
            throw new NotFoundException("Book doesn't Exist")
        }
        return book

    }

    async getBooks(dto: PaginationDto) {
        const total = await this.prisma.book.count({where: {
                title: {
                    search: dto.search,
                },
            },});

        const skip = (dto.page - 1) * dto.limit;
        const totalPages = Math.ceil(total / dto.limit);
        //const totalPages = Math.ceil(total / dto.limit);
        console.log("🚀 ~ BookService ~ getBooks ~ totalPages:", totalPages)
        const books = await this.prisma.book.findMany({
            skip: skip, //This is used for the pagination to get some specific books 
            where: {
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

        //     const total=this.prisma.book.count({
        //       where: { // <- duplicate
        //       id: dto.id
        //     }
        //   })
        // var total = await this.prisma.book.count({ // To find all books exist in tables 
        //     select: {
        //         id: true, // Count all records
        //         //: true, // Count all non-null field values
        //     },
        // })

        //console.log("🚀 ~ BookService ~ getBooks ~ total:", total)
        //console.log("🚀 ~ BookService ~ getBooks ~ dto:", dto)

        //const skip = (dto.page - 1) * dto.limit
        // console.log("🚀 ~ BookService ~ getBooks ~ skip:", skip)


    }

    async updateBook(@Body() dto: EditBookDto) {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                id: dto.id
            },
        });
        if (!existingBook) {
            throw new NotFoundException("Book doesn't Exist")
        }
        const updatedBoard = this.prisma.book.update({
            data: {
                title: dto.title,
                author: dto.author,
                description: dto.description,
                publish_Year: dto.publish_Year,
                edition: dto.edition,
                publisher: dto.publisher
            },
            where: {
                id: dto.id,
            }
        })
        return updatedBoard
    }

    async deleteBook(dto: EditBookDto) {
        const existingBook = await this.prisma.book.findFirst({
            where: {
                id: dto.id
            },
        });
        if (!existingBook) {
            throw new NotFoundException("Book doesn't Exist")
        }

        const book = await this.prisma.book.delete({
            where: {
                id: dto.id
            }
        })

        return book
    }
}