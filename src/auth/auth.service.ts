import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async sendOtp(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.userModel.findOneAndUpdate(
      { phone },
      { phone, otp, otpExpiry, isVerified: false },
      { upsert: true, new: true },
    );

    // TODO: Integrate real SMS gateway (SslWireless, Banglaphone, etc.)
    console.log(`📱 OTP for ${phone} is: ${otp}`);

    return { success: true, message: 'OTP sent successfully' };
  }

  async verifyOtp(phone: string, otp: string) {
    const user = await this.userModel.findOne({ phone });

    if (
      !user ||
      !user.otp ||
      user.otp !== otp ||
      new Date() > user.otpExpiry!
    ) {
      return { success: false, message: 'Invalid or expired OTP' };
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return {
      success: true,
      message: 'Login successful',
      user: { id: user._id, phone: user.phone, name: user.name },
    };
  }
}
