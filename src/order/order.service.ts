import { Body, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/order-create.dto";
import { user } from "generated/prisma";
import { Decimal } from "generated/prisma/runtime/library";

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createOrder(@Body() dto: CreateOrderDto, currentUser: user) {
        try {

            const existingBook = await this.prisma.book.findFirst({
                where: {
                    id: dto.bookId,
                },
            })
            console.log("🚀 ~ OrderService ~ createOrder ~ existingBook:", existingBook)
            //console.log("🚀 ~ OrderService ~ createOrder ~ existingBook:", existingBook)
            if (!existingBook) {
                throw new NotFoundException("Book doesn't Exist")
            }
            if (existingBook.Stock === 0 || existingBook.Stock < dto.quantity) {
                throw new NotFoundException("Out of stock")
            }
            const price = existingBook.price
            const quantityDecimal = new Decimal(dto.quantity);
            const totalPrice: Decimal = quantityDecimal.mul(existingBook.price);
            const updatedBook = await this.prisma.book.update({
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

            // return order

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

}