import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AdminGetOrderDto {
    @IsInt()
    @IsNotEmpty()
    id: number

}