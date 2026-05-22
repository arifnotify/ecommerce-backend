// src/orders/orders.controller.ts

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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // ✅ CREATE ORDER (LOGIN REQUIRED)
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, dto);
  }

  // ✅ GET ALL ORDERS (ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // ✅ GET MY ORDERS (USER)
  @UseGuards(AuthGuard)
  @Get('my-orders')
  findMyOrders(@Req() req: any) {
    return this.ordersService.findByUser(req.user.id);
  }

  // ✅ GET SINGLE ORDER
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // ✅ UPDATE STATUS (ADMIN)
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.updateStatus(id, dto.status);
  }
}
