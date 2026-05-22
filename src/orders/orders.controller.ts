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

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.ordersService.create(req.user.id, body);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.ordersService.updateStatus(id, body.status);
  }
}