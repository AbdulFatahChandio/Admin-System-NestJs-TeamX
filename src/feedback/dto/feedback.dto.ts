import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateFeedbackDto {
    // @IsInt()
    // @IsNotEmpty()
    // bookId: number

    @IsInt()
    @IsNotEmpty()
    orderId: number

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    reviews: string


}