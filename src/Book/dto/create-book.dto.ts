import { IsDecimal, IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";
import { Decimal } from "generated/prisma/runtime/library";
import { isFloat16Array } from "util/types";
// import jakarta.validation.constraints.PositiveOrZero;

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    author: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    publish_Year: string

    @IsString()
    @IsNotEmpty()
    edition: string

    @IsString()
    @IsNotEmpty()
    publisher: string

    @IsNotEmpty()
    @IsDecimal()
    price: Decimal


    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    stock: number


}