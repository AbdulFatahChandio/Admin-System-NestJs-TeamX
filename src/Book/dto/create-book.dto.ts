import { IsInt, IsNotEmpty, IsString } from "class-validator";

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

    @IsInt()
    @IsNotEmpty()
    price : number

    
    @IsInt()
    @IsNotEmpty()
    stock : number


}