import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginOtpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+880\d{9}$/, { message: 'Phone number must be +880XXXXXXXXX' })
  phone: string;
}
