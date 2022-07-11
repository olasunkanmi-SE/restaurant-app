import { RedisCacheService } from './../../../../libs/commom/src/cache/redis-service';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repository/order-repository';
import { OrderDocument } from '../schema/order-schema';
import { CreateOrderDTO } from '../validators/create-order-dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private redisCacheService: RedisCacheService,
  ) {}

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

  async getHello(): Promise<any> {
    await this.redisCacheService.set('ola', { hello: 'hi' });
    const retrieved = await this.redisCacheService.get('ola');
    console.log(retrieved);
  }
}
