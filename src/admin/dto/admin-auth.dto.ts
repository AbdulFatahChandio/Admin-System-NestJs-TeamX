import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AdminAuthDto {
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