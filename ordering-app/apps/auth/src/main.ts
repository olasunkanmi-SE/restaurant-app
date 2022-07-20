import { NestFactory } from '@nestjs/core';
import { KafkaService } from 'libs/commom/src';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const kafkaService = app.get<KafkaService>(KafkaService);
  app.connectMicroservice(kafkaService.getOptions('AUTH_CONSUMER'));
  await app.listen(3000);
}
bootstrap();
