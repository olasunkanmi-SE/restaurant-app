import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { OrderDocument } from '../schema/order-schema';
import { CreateOrderDTO } from '../validators/create-order-dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(): Promise<OrderDocument[]> {
    return this.ordersService.getOrders();
  }

  @Post()
  async createUser(@Body() createOrderParams: CreateOrderDTO) {
    return await this.ordersService.createUser(createOrderParams);
  }

  @Get('/cache')
  async getCached() {
    return await this.ordersService.getHello();
  }
}
