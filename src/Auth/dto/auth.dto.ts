import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsOptional()
    nickName: string

    @IsString()
    @IsNotEmpty()
    role: string


}