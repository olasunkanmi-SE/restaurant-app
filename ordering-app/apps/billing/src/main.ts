import { NestFactory } from '@nestjs/core';
import { KafkaService } from 'libs/commom/src';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const kafkaService = app.get<KafkaService>(KafkaService);
  app.connectMicroservice(kafkaService.getOptions('BILLING_CONSUMER'));
}
bootstrap();
