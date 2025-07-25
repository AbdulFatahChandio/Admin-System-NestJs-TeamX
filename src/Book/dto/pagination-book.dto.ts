import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class PaginationDto {

    @IsInt()
    @IsOptional()
    page: number = 1;


    @IsInt()
    @IsOptional()
    limit: number = 10;

    @IsInt()
    @IsOptional()
    id: number

    @IsString()
    @IsOptional()
    search: string
}