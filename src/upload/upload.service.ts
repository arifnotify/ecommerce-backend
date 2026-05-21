import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(file.path);

    return {
      url: result.secure_url,
    };
  }
}
