import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
