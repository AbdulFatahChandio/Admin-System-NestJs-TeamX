import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Status } from "generated/prisma";

export class AdminEditOrderDto {
    @IsInt()
    @IsNotEmpty()
    id: number

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status

    @IsString()
    @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    courierName: string

    @IsString()
    @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    trackingId: string
}