import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "generated/prisma";

export class AdminEditOrderDto{
    @IsInt()
    @IsNotEmpty()
    id : number

    @IsEnum(Status)
    @IsNotEmpty()
    status:Status
}