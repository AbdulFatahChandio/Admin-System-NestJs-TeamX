import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from '@nestjs/passport';

@Module({
      imports: [JwtModule.register({
    secret: 'nomnom',
    signOptions: { expiresIn: '1d' },
  })],
    providers:[AuthService],
    controllers:[AuthController]
})

export class AuthModule{}