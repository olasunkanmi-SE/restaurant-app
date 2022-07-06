import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../../../../libs/commom/src/database';
import { Connection, Model } from 'mongoose';
import { Order, OrderDocument } from '../schema/order-schema';

export class OrdersRepository extends EntityRepository<OrderDocument> {
  protected readonly logger = new Logger(OrdersRepository.name);
  constructor(
    @InjectModel(Order.name) orderModel: Model<OrderDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
