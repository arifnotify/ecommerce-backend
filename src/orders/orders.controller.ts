import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // Create Order
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: any, @Body() body: any) {
    return await this.ordersService.create(req.user.id, body);
  }

  // Show Only Orders Data
  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();

    return orders;
  }

  // Update Order Status
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: any) {
    return await this.ordersService.updateStatus(id, body.status);
  }
}