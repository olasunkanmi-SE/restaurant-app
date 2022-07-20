import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersRepository } from 'apps/orders/src/repository/order-repository';
import * as Joi from 'joi';
import { DocumentDatabaseModule } from 'libs/commom/src';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    DocumentDatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, OrdersRepository],
})
export class AuthModule {}
