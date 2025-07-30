import { Module } from "@nestjs/common";
import { AdminOrderService } from "./admin.order.service";
import { AdminOrderController } from "./admin.order.controller";


@Module({
    providers:[AdminOrderService],
    controllers:[AdminOrderController]
})

export class AdminOrderModule{}