import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AdminAuthModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule,AdminAuthModule, PrismaModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
