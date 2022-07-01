import { Module } from '@nestjs/common';
import { CommomService } from './commom.service';

@Module({
  providers: [CommomService],
  exports: [CommomService],
})
export class CommomModule {}
