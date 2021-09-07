import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('files'),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
  ) {
    return await this.uploadService.addToQueue(file);
  }
}

