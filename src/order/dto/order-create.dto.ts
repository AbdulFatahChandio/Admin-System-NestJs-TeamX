import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    
    @IsInt()
    @IsNotEmpty()
    quantity: number

    @IsString()
    @IsNotEmpty()
    shippingAddress: string

    @IsInt()
    @IsNotEmpty()
    bookId : number

  

}