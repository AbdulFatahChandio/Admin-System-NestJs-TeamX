import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { first } from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        public JWT: JwtService,
        public config: ConfigService
    ) {

    }

    async signup(@Body() dto: AuthDto) {
        const hash = await bcrypt.hash(dto.password, 10)
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    userName: dto.userName,
                    role: dto.role
                }
            })
            return {
                message: 'User created successfully',
                status: 'success',

                data: {
                    email: user?.email,
                    password: user?.password,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    userName: user?.userName,
                    role: user?.role,
                    token: await this.signToken(user.id, user.email)
                },
            }
        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Email & Username must be unique');
            }
            throw error;
        }

    }

    async signin(dto: AuthLoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new ForbiddenException(
                'Invalid email or password',
            );
        const matchPassword = await bcrypt.compare(dto.password, user.password)
        if (!matchPassword)
            throw new ForbiddenException(
                'Invalid email or password',
            );
        //   delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
        // return the saved user 
        // return user




        return {
            message: 'User login successfully',
            status: 'success',
            data: {
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                role: user?.role,
                token: await this.signToken(user.id, user.email)
            },
        }
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