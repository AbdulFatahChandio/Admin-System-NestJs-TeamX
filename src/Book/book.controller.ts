import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { RolesGuard } from "src/Role/roles.guard";
import { Roles } from "src/Role/roles.decorater";
import { Role } from "src/Role/role.enum";
import { EditBookDto } from "./dto/edit-book.dto";
import { PaginationDto } from "./dto/pagination-book.dto";

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
    constructor(
        private bookService: BookService
    ) { }

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    createBook(@Body() dto: CreateBookDto) {
        return this.bookService.createBook(dto)
    }

    @Get('/getBook/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.User)
    getBook(@Param() dto: EditBookDto) {
        return this.bookService.getBook(dto)
    }

    @Get('/getBooks')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.User)
    getBooks(@Query() dto: PaginationDto) {
        return this.bookService.getBooks(dto)
    }

    @Put('/update')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    updateBook(@Body() dto: EditBookDto) {
        return this.bookService.updateBook(dto)
    }


    @Delete('/delete/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    deleteBook(@Param() dto: EditBookDto) {
        return this.bookService.deleteBook(dto)
    }
}