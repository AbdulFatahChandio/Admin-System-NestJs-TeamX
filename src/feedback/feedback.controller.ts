import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/Auth/Guard/jwt.guard";
import { Role } from "src/Role/role.enum";
import { Roles } from "src/Role/roles.decorater";
import { RolesGuard } from "src/Role/roles.guard";
import { CreateFeedbackDto } from "./dto/feedback.dto";
import { GetUser } from "src/Auth/decorater/get-user.decorater";
import { user } from "generated/prisma";
import { UserOrderFeedbackService } from "./feedback.service";

@UseGuards(JwtGuard)
@Controller('user')
export class UserOrderFeedbackController {
    constructor(
        private userOrderFeedbackService: UserOrderFeedbackService
    ) { }

    @Post('/order/feedback')
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    createOrderFeedback(@Body() dto: CreateFeedbackDto, @GetUser() currentUser: user) {
        return this.userOrderFeedbackService.createOrderFeedback(dto, currentUser)
    }

}