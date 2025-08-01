import { IsDecimal, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Decimal } from "generated/prisma/runtime/library";

export class CreateUserOrderDto {

    @IsInt()
    @IsNotEmpty()
    quantity: number

    @IsString()
    @IsNotEmpty()
    shippingAddress: string

    @IsInt()
    @IsNotEmpty()
    bookId: number

}