import { Injectable, BadRequestException } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class UploadService {
  async uploadImage(file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await cloudinary.uploader.upload(file.path);

    return {
      url: result.secure_url,
    };
  }
}
