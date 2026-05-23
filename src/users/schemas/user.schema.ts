import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  name?: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  otp?: string;

  @Prop()
  otpExpiry?: Date;

  @Prop()
  fcmToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
