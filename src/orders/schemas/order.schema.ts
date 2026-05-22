import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User' })
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

  @Prop()
  totalAmount: number;

  @Prop({
    default: 'pending',
  })
  status: string;

  @Prop()
  address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
