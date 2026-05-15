import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({
    default: 0,
  })
  stock: number;

  @Prop()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
