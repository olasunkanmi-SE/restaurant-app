import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { OrderCreated } from './order-created';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleOrderCreated(orderCreated: OrderCreated) {
    console.log(orderCreated);
    await this.authClient
      .send('get_user', new GetUserRequest(orderCreated.name))
      .subscribe((user) => {
        console.log(user);
        console.log(
          `Billing user with stripe ID ${user.name} a price of $${user.price}...`,
        );
      });
  }
}
