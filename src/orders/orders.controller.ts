import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

@UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.ordersService.create(req.user.userId, body);
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
