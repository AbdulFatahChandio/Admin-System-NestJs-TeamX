import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserOrderService } from "./user.order.service";
import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { RolesGuard } from "src/Role/roles.guard";
import { Roles } from "src/Role/roles.decorater";
import { Role } from "src/Role/role.enum";
import { CreateUserOrderDto } from "./dto/user.order-create.dto";
import { user } from "generated/prisma";
import { GetUser } from "src/Auth/decorater/get-user.decorater";
import { EditUserOrderDto } from "./dto/user.order-edit.dto";
import { UserOrderPaginationDto } from "./dto/user-pagination.order.dto";


@UseGuards(JwtGuard)
@Controller('user')
export class UserOrderController {
    constructor(
        private userOrderService: UserOrderService
    ) { }

    @Post('/order')
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    createOrder(@Body() dto: CreateUserOrderDto, @GetUser() currentUser: user) {
        return this.userOrderService.createOrder(dto, currentUser)
    }

    @Get('/order/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    getOrder(@Param() dto: EditUserOrderDto, @GetUser() currentUser: user) {
        return this.userOrderService.getOrder(dto, currentUser)
    }

    @Get('/orders')
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    getOrders(@Body() dto : UserOrderPaginationDto, @GetUser() currentUser: user) {
        return this.userOrderService.getOrders(dto, currentUser)
    }
}