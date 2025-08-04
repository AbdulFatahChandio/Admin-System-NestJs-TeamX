import { Module } from "@nestjs/common";
import { UserOrderFeedbackService } from "./feedback.service";
import { UserOrderFeedbackController } from "./feedback.controller";

@Module({
    providers:[UserOrderFeedbackService],
    controllers:[UserOrderFeedbackController]
})

export class UserOrderFeedbackModule{}