import { GetUserRequest } from './get-user-request-dto';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'apps/orders/src/repository/order-repository';

@Injectable()
export class AuthService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUser(userRequest: GetUserRequest): Promise<any> {
    const orders = await this.ordersRepository.find({});
    return orders.find((user) => user.name === userRequest.name);
  }
}
