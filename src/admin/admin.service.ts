import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { Role } from "generated/prisma";
import { AdminAuthDto } from "./dto/admin-auth.dto";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { first } from "rxjs";

@Injectable()
export class AdminAuthService {
    constructor(
        private prisma: PrismaService,
        public JWT: JwtService,
        public config: ConfigService
    ) {

    }

    async signup(@Body() dto: AdminAuthDto) {
        const hash = await bcrypt.hash(dto.password, 10)
        try {

            // console.log("🚀 ~ AuthService ~ signup ~ this.prisma:", this.prisma)
            const admin = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    nickName: dto.nickName,
                    role: Role.ADMIN
                }
            })
            // return this.signToken(admin.id, admin.email);
            return {
                // Token: await this.signToken(admin.id, admin.email),
                data: {
                email : admin?.email,
                firstName: admin?.firstName,
                lastName: admin?.lastName,
                token: await this.signToken(admin.id, admin.email)
            }
            }
        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Email must be unique');
            }
            throw error;
        }

    }

    async signin(dto: AdminLoginDto) {
            // find the user by email
            const admin = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
           
            // if user does not exist throw exception
            if (!admin)
                throw new ForbiddenException(
                    'Invalid email or password',
                );
    
            // compare password
            const matchPassword = await bcrypt.compare(dto.password, admin.password)
            //console.log("match password : " , matchPassword,"Dto password : ", user.hash, "User hash : s", dto.password)
            if (!matchPassword)
                throw new ForbiddenException(
                    'Invalid email or password',
                );
            //   delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
            //return the saved user
             return {
                // Token: await this.signToken(admin.id, admin.email),
                data: {
                email : admin?.email,
                firstName: admin?.firstName,
                lastName: admin?.lastName,
                token: await this.signToken(admin.id, admin.email)
            }
            } 
            // return {
            //     Token: await this.signToken(admin.id, admin.email),
            //     Admin : {
            //     email : admin?.email,
            //     firstName: admin?.firstName,
            //     lastName: admin?.lastName
            // }
            // }
        }
    
        async signToken(
            userId: number,
            email: string,
        ): Promise<{ access_token: string }> {
            const payload = {
                sub: userId,
                email,
            };
            const secret = this.config.get('JWT_SECRET');
    
            const token = await this.JWT.signAsync(
                payload,
                {
                    expiresIn: '340m',
                    secret: secret,
                },
            );
    
            return {
                access_token: token,
            };
        }
}