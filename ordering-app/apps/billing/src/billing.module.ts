import { Module } from '@nestjs/common';
import { RabbitMQModule } from 'libs/commom/src/rabbitMQ/rabbitmq-module';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [RabbitMQModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
