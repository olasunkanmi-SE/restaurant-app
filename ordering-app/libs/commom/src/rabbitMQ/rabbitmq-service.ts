import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
export class RabbitMQService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = false) {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistence: true,
      },
    };
  }
}
