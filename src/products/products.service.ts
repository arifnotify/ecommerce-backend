import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async findAll() {
    return await this.productModel.find();
  }
}
