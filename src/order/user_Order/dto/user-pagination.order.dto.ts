import { IsInt, IsOptional } from "class-validator";

export class UserOrderPaginationDto{
    @IsInt()
    @IsOptional()
    page: number = 1;


    @IsInt()
    @IsOptional()
    limit: number = 10;
}