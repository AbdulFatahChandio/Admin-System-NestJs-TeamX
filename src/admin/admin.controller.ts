// import { Body, Controller, HttpCode, Post } from "@nestjs/common";
// import { AdminAuthDto } from "./dto/admin-auth.dto";
// import { AdminAuthService } from "./admin.service";
// import { HttpStatus } from "@nestjs/common";


// @Controller('admin')
// export class adminController {
//     constructor(
//         private adminAuthService: AdminAuthService
//     ) {

//     }

//     @Post('/auth/signup')
//     signup(@Body() dto: AdminAuthDto) {
//         return this.adminAuthService.signup(dto)
//     }

//     @HttpCode(HttpStatus.OK)
//     @Post('/auth/signin')
//     signin(@Body() dto: AdminAuthDto) {
//         return this.adminAuthService.signin(dto);
//     }
// }
