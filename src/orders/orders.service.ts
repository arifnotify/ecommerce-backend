import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    return this.orderModel.create({
      user: userId,
      ...dto,
    });
  }

  async findAll() {
    return this.orderModel.find().populate('user');
  }

  async updateStatus(id: string, status: string) {
    return this.orderModel.findByIdAndUpdate(id, { status }, { new: true });
  }
}
