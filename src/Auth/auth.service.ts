import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { Role } from "generated/prisma";
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

            // console.log("🚀 ~ AuthService ~ signup ~ this.prisma:", this.prisma)
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    nickName: dto.nickName,
                    role: Role.USER
                }
            })
            // return user
           
            // return this.signToken(user.id, user.email); It returns only token
            return {
            
            data: {
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                 token : await this.signToken(user.id, user.email)
            },
            // token: await this.signToken(user.id, user.email)
        }
            // return {
            //     Token: await this.signToken(user.id, user.email),
            //     User: {
            //         email: user?.email,
            //         firstName: user?.firstName,
            //         lastName: user?.lastName
            //     }
            // }
        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }

    }

    async signin(dto: AuthLoginDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // console.log("🚀 ~ AuthService ~ signin ~ user:", user)
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
                'Invalid email or password',
            );

        // compare password
        const matchPassword = await bcrypt.compare(dto.password, user.password)
        //console.log("match password : " , matchPassword,"Dto password : ", user.hash, "User hash : s", dto.password)
        if (!matchPassword)
            throw new ForbiddenException(
                'Invalid email or password',
            );
        //   delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
        // return the saved user 
        // return user




        return {
            
            data: {
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                 token : await this.signToken(user.id, user.email)
            },
            // token: await this.signToken(user.id, user.email)
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