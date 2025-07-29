import { Module } from "@nestjs/common";
import { UserOrderService } from "./user.order.service";
import { UserOrderController } from "./user.order.controller";

@Module({
    providers:[UserOrderService],
    controllers:[UserOrderController]
})

export class UserOrderModule{}