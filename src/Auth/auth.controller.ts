import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { HttpStatus } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {

    }

    @Post('/signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    signin(@Body() dto: AuthLoginDto) {
        return this.authService.signin(dto);
    }
}