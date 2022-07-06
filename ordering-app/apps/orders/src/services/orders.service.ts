import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repository/order-repository';
import { OrderDocument } from '../schema/order-schema';
import { CreateOrderDTO } from '../validators/create-order-dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrders(): Promise<OrderDocument[]> {
    return await this.ordersRepository.find({});
  }

  async getOrderById(userId: string) {
    return await this.ordersRepository.findOne({ _id: userId });
  }

  async createUser(props: CreateOrderDTO) {
    const { name, price, phoneNumber } = props;
    return this.ordersRepository.create({
      name,
      price,
      phoneNumber,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
