import { IsInt, IsNotEmpty } from "class-validator";

export class EditUserOrderDto{
    
        @IsInt()
        @IsNotEmpty()
        id: number
}