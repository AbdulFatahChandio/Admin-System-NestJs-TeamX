import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './Book/book.module';
import { UserOrderModule } from './order/user_Order/user.order.module';
import { AdminOrderModule } from './order/admin_Order/admim.order.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, BookModule,UserOrderModule,AdminOrderModule,PrismaModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
