import { IsNotEmpty,  IsString } from "class-validator";

export class AdminLoginDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}