import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Product, ProductSchema } from './schemas/product.schema';

import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    }),
  ],

  controllers: [ProductsController],

  providers: [ProductsService, AuthGuard, RolesGuard],
})
export class ProductsModule {}
