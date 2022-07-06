import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from './../../../../libs/commom/src/database/base-document';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order extends BaseDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
