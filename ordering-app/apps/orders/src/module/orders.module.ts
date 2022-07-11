import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schema/order-schema';
import { OrdersRepository } from '../repository/order-repository';
import { DocumentDatabaseModule } from 'libs/commom/src/database';
import { RedisCacheModule } from 'libs/commom/src/cache/redis-module';

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
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RedisCacheModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
