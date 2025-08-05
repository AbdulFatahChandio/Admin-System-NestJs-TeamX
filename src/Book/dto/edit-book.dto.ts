import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class EditBookDto {
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    authorName: string

    @IsInt()
    @IsNotEmpty()
    authorId:number

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    publish_Year: string

    @IsString()
    @IsOptional()
    edition: string

    @IsString()
    @IsOptional()
    publisher: string

    @IsInt()
    @IsNotEmpty()
    id: number

    @IsInt()
    @IsOptional()
    price: number


    @IsInt()
    @IsOptional()
    @Min(2) 
    @Max(1000000) 
    stock: number

}