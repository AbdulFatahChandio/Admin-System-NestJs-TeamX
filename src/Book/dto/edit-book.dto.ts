import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditBookDto {
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    author: string

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
    id:number

}