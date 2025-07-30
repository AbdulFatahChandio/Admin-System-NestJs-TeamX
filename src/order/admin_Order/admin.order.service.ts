import { Body, Injectable, NotFoundException, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminGetOrderDto } from "./dto/admin-get.order.dto";
import { AdminEditOrderDto } from "./dto/admin-edit.order.dto";
import { AdminOrderPaginationDto } from "./dto/admin-pagination.order.dto";

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
        const total = await this.prisma.order.count({
            // where: {
            //     title: {
            //         search: dto.search,

            //     },

            // },
        });

        const skip = (dto.page - 1) * dto.limit;
        const totalPages = Math.ceil(total / dto.limit);
        //const totalPages = Math.ceil(total / dto.limit);
        //console.log("🚀 ~ BookService ~ getBooks ~ totalPages:", totalPages)
        const orders = await this.prisma.order.findMany({
            skip: skip, //This is used for the pagination to get some specific books 
            // where: {
            //     title: {
            //         search: dto.search,
            //     },
            // },
            take: dto.limit,
        })
        return {
            // message:'All books here',
            // status:'success',
            total: total,
            total_Pages: totalPages,
            data:
                orders
        }
        // const order = await this.prisma.order.findMany({
        // });
        // if (!order) {
        //     throw new NotFoundException("No Order Found")
        // }
        // return {

        //     data:
        //         order
        // }
    }

    async updateOrder(@Body() dto: AdminEditOrderDto) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: dto.id,
            },
        });
        if (!order) {
            throw new NotFoundException("No Order Found")
        }
        const updatedOrder = await this.prisma.order.update({
            where: {
                id: dto.id,
            },
            data: {
                status: dto.status
            }

        })

        return {
            message: 'Order updated successfully',
            status: 'success',
            data: updatedOrder
        }
    }
}