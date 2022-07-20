import { Module } from '@nestjs/common';
import { KafkaModule } from 'libs/commom/src';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { billingConstant } from './constants/billing-constant';

@Module({
  imports: [
    KafkaModule.register({
      name: billingConstant.AUTH_SERVICE,
      groupId: billingConstant.AUTH_CONSUMER,
      clientId: billingConstant.AUTH_CLIENT_ID,
    }),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
