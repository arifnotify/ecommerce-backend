import { Injectable, BadRequestException } from '@nestjs/common';

import cloudinary from '../config/cloudinary.config';

@Injectable()
export class UploadService {
  async uploadImage(file: any) {
    try {
      console.log('FILE:', file);

      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const result = await cloudinary.uploader.upload(file.path);

      console.log('CLOUDINARY RESULT:', result);

      return {
        success: true,
        url: result.secure_url,
      };
    } catch (error: any) {
      console.log('UPLOAD ERROR:', error);

      throw new BadRequestException(error.message || 'Upload failed');
    }
  }
}
