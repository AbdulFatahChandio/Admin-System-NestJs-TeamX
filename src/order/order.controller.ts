import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { RolesGuard } from "src/Role/roles.guard";
import { Roles } from "src/Role/roles.decorater";
import { Role } from "src/Role/role.enum";
import { CreateOrderDto } from "./dto/order-create.dto";
import { user } from "generated/prisma";
import { GetUser } from "src/Auth/decorater/get-user.decorater";


@UseGuards(JwtGuard)
@Controller('orders')
export class OrderController {
    constructor(
        private orderService: OrderService
    ) { }

    @Post('/order')
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    createOrder(@Body() dto: CreateOrderDto , @GetUser() currentUser: user) {
        return this.orderService.createOrder(dto , currentUser)
    }
}