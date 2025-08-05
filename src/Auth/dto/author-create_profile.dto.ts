import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class createAuthorProfile{
    @IsInt()
    @IsNotEmpty()
    authorId:number

    @IsString()
    @IsNotEmpty()
    authorName:string

    @IsString()
    @IsNotEmpty()
    aboutAuthor:string
}