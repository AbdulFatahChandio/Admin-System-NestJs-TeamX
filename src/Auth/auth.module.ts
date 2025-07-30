import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./Strategy/jwt.strategy";

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: 'nomnom',
    signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService ,JwtStrategy],
  controllers: [AuthController]
})

export class AuthModule { }