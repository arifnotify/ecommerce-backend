import { Injectable, BadRequestException } from '@nestjs/common';

import cloudinary from '../config/cloudinary.config';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  async uploadImage(file: any) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'uploads',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                success: true,
                url: result?.secure_url,
              });
            }
          },
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Upload failed');
    }
  }
}
