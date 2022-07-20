import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export class KafkaService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(groupId: string) {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [this.configService.get<string>('KAFKABROKER')],
        },
        consumer: {
          groupId: this.configService.get<string>(`${groupId}`),
        },
      },
    };
  }
}
