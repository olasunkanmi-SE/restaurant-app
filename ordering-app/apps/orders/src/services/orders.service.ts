import { OrderCreatedEvent } from './../events/order-created.event';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrdersRepository } from '../repository/order-repository';
import { OrderDocument } from '../schema/order-schema';
import { CreateOrderDTO } from '../validators/create-order-dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}

  async getOrders(): Promise<OrderDocument[]> {
    return await this.ordersRepository.find({});
  }

  async getOrderById(userId: string) {
    return await this.ordersRepository.findOne({ _id: userId });
  }

  async createOrder(props: CreateOrderDTO) {
    const { name, price, phoneNumber } = props;
    await lastValueFrom(
      this.billingClient.emit(
        'order_created',
        new OrderCreatedEvent(name, price, phoneNumber),
      ),
    );

    // return this.ordersRepository.create({
    //   name,
    //   price,
    //   phoneNumber,
    // });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
