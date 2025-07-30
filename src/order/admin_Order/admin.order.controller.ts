import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";

import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { RolesGuard } from "src/Role/roles.guard";
import { Roles } from "src/Role/roles.decorater";
import { Role } from "src/Role/role.enum";
import { AdminGetOrderDto } from "./dto/admin-get.order.dto";
import { AdminOrderService } from "./admin.order.service";
import { AdminEditOrderDto } from "./dto/admin-edit.order.dto";
import { AdminOrderPaginationDto } from "./dto/admin-pagination.order.dto";


@UseGuards(JwtGuard)
@Controller('admin')
export class AdminOrderController {
    constructor(
        private adminOrderService: AdminOrderService
    ) { }

    @Get('/order/:id')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    getOrder(@Param() dto: AdminGetOrderDto) {
        return this.adminOrderService.getOrder(dto)
    }

    @Get('/orders')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    getOrders(@Query() dto:AdminOrderPaginationDto) {
        return this.adminOrderService.getOrders(dto)
    }

    @Put('/order/update')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    updateOrder(@Body() dto:AdminEditOrderDto) {
        return this.adminOrderService.updateOrder(dto)
    }
}

