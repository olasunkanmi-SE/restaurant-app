import { NestFactory } from '@nestjs/core';
import { RabbitMQService } from 'libs/commom/src';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice(
    rabbitMQService.getOptions(process.env.BILLING_TOPIC),
  );
  await app.listen(3000);
}
bootstrap();
