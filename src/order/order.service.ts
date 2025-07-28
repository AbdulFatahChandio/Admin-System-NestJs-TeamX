import { Body, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/order-create.dto";
import { user } from "generated/prisma";

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createOrder(@Body() dto: CreateOrderDto ,currentUser:user) {
        try {
            const existingBook = await this.prisma.book.findFirst({
                where: {
                    id: dto.bookId
                },
            })
            console.log("🚀 ~ OrderService ~ createOrder ~ existingBook:", existingBook)
            if (!existingBook) {
                throw new NotFoundException("Book doesn't Exist")
            }
            if(existingBook.Stock===0){
                throw new NotFoundException("Out of stock")
            }

            const order = await this.prisma.order.create({
                data: {
                    customer:currentUser.userName,
                    userId:currentUser.id,
                    bookId: dto.bookId,
                    quantity: dto.quantity,
                    shippingAddress: dto.shippingAddress,
                    unitPrice: existingBook.price,
                    totalPrice:dto.quantity*existingBook.price
                }
            })
            // return user

            // return this.signToken(user.id, user.email); It returns only token
            return {
                message: 'Order booked successfully', status: 'success',
                data:
                    order
            }
            // token: await this.signToken(user.id, user.email)

        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Invalid User');
            }
            throw error;
        }


    }

}