import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFeedbackDto } from "./dto/feedback.dto";
import { user } from "generated/prisma";

@Injectable()
export class UserOrderFeedbackService {
    constructor(
        private prisma: PrismaService,
        public config: ConfigService
    ) { }

    async createOrderFeedback(dto: CreateFeedbackDto, currentUser: user) {
        const existingOrder = await this.prisma.order.findFirst({
            where: {
                id: dto.orderId,
                userId: currentUser.id
            },
        })
        if (!existingOrder) {
            throw new NotFoundException("Order doesn't Exist")
        }

        const feedback = await this.prisma.feedback.create({
            data: {
                bookId: existingOrder.bookId,
                orderId: dto.orderId,
                rating: dto.rating,
                reviews: dto.reviews,
                userId: currentUser.id

            }
        })
        return {
            message: 'Feedback given successfully', status: 'success',
            // total_rating: totalRating,
            data: 
                feedback
            
        }
    }
}