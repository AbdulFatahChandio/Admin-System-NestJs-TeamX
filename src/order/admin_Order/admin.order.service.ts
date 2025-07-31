import { BadGatewayException, BadRequestException, Body, Injectable, NotFoundException, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminGetOrderDto } from "./dto/admin-get.order.dto";
import { AdminEditOrderDto } from "./dto/admin-edit.order.dto";
import { AdminOrderPaginationDto } from "./dto/admin-pagination.order.dto";
import { Status } from "generated/prisma";

@Injectable()
export class AdminOrderService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async getOrder(@Param() dto: AdminGetOrderDto) {

        const order = await this.prisma.order.findFirst({
            where: {
                id: dto.id,
            },
        });
        if (!order) {
            throw new NotFoundException("No Order Found")
        }
        return {

            data:
                order
        }
    }

    async getOrders(dto: AdminOrderPaginationDto) {
        const total = await this.prisma.order.count();

        const skip = (dto.page - 1) * dto.limit;
        const totalPages = Math.ceil(total / dto.limit);
        const orders = await this.prisma.order.findMany({
            skip: skip,
            take: dto.limit,
        })
        return {
            total: total,
            total_Pages: totalPages,
            data:
                orders
        }

    }

    async updateOrder(dto: AdminEditOrderDto) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: dto.id,
            },
        });
        if (!order) {
            throw new NotFoundException("No Order Found")
        }
        const OrderStatusUpdateCriteria = {
            received: "packed",
            packed: "shipped",
            shipped: "delivered"
        }
        
        if (OrderStatusUpdateCriteria[order.status] !== dto.status) {
            throw new BadRequestException(`Invalid status change from '${order.status}' to '${dto.status}'`);
        }

        const data: { status: Status, courierName?: string, trackingId?: string } = {
            status: dto.status
        };


        if (dto.status === 'shipped' && (!dto.courierName || !dto.trackingId)) {
            throw new BadRequestException("Courier name and Tracking id is required")
        }

        if (dto.status === "shipped") {
            data.courierName = dto.courierName;
            data.trackingId = dto.trackingId;
        }

        const updatedOrder = await this.prisma.order.update({
            where: {
                id: dto.id,

            },
            data: data

        })
        return {
            message: 'Order updated successfully',
            status: 'success',
            data: updatedOrder
        }
    }
}