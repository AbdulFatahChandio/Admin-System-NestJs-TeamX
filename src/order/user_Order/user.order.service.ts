import { Body, ForbiddenException, Injectable, NotFoundException, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserOrderDto } from "./dto/user.order-create.dto";
import { user } from "generated/prisma";
import { Decimal } from "generated/prisma/runtime/library";
import { EditUserOrderDto } from "./dto/user.order-edit.dto";
import { UserOrderPaginationDto } from "./dto/user-pagination.order.dto";

@Injectable()
export class UserOrderService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createOrder(@Body() dto: CreateUserOrderDto, currentUser: user) {
        try {

            const existingBook = await this.prisma.book.findFirst({
                where: {
                    id: dto.bookId,
                    deletedAt: null
                },
            })

            if (!existingBook) {
                throw new NotFoundException("Book doesn't Exist")
            }
            if (existingBook.Stock === 0 || existingBook.Stock < dto.quantity) {
                throw new NotFoundException("Out of stock")
            }
            const price = existingBook.price
            const quantityDecimal = new Decimal(dto.quantity);
            const totalPrice: Decimal = quantityDecimal.mul(existingBook.price);
            await this.prisma.book.update({
                data: {
                    Stock: existingBook.Stock - dto.quantity
                },
                where: {
                    id: dto.bookId
                }
            })
            const order = await this.prisma.order.create({
                data: {
                    customer: currentUser.userName,
                    userId: currentUser.id,
                    bookId: dto.bookId,
                    quantity: dto.quantity,
                    shippingAddress: dto.shippingAddress,
                    unitPrice: price,
                    totalPrice: totalPrice
                }
            })
            return {
                message: 'Order booked successfully', status: 'success',
                data:
                    order
            }

        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Invalid User');
            }
            throw error;
        }
    }

    async getOrder(@Param() dto: EditUserOrderDto, currentUser: user) {

        const order = await this.prisma.order.findFirst({
            where: {
                id: dto.id,
                userId: currentUser.id
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

    async getOrders(dto: UserOrderPaginationDto, currentUser: user) {

        const total = await this.prisma.order.count({
            where: {
                userId: currentUser.id
            },
        });

        const skip = (dto.page - 1) * dto.limit;
        const totalPages = Math.ceil(total / dto.limit);
        const orders = await this.prisma.order.findMany({
            where: {
                userId: currentUser.id
            },
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

}