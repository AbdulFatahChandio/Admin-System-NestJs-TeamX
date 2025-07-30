import { IsDecimal, IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";
import { Decimal } from "generated/prisma/runtime/library";

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
    @Min(2)  
    @Max(1000000) 
    stock: number


}