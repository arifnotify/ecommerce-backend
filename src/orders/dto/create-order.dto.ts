import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items: any[];

  @IsNumber()
  totalAmount: number;

  @IsString()
  address: string;
}
