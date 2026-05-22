// src/orders/schemas/order.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ])
  items: any[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ required: true })
  address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
