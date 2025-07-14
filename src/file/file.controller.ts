import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import { file_slice_size } from '../const';

type UploadFileType = 'doc' | 'img' | 'video';

interface UploadBody {
  type: UploadFileType;
}

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload_file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: undefined, // 使用内存存储，不保存到磁盘
    }),
  )
  uploadFile(
    @Body() body: UploadBody,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { type } = body;
    return this.fileService.uploadFile(type, file);
  }

  @Get('get_resource')
  getResource(@Query('file_id') fileId: string, @Res() res: Response) {
    try {
      console.log('fileId', fileId);
      if (!fileId) {
        throw new HttpException('文件ID不能为空', HttpStatus.BAD_REQUEST);
      }

      const { fileStream, fileSize, suffix } =
        this.fileService.getResource(fileId);

      // 设置响应头
      res.setHeader('Content-Type', this.getContentType(suffix));

      // 根据文件大小设置缓存策略
      if (fileSize > file_slice_size) {
        throw new HttpException(
          '文件过大，暂不支持下载',
          HttpStatus.BAD_REQUEST,
        );
      } else if (fileSize > 1024 * 200) {
        // 1MB < n < 6MB，设置7天缓存
        res.setHeader('Cache-Control', `max-age=${3600 * 24 * 7}`);
      } else {
        // 小文件，不缓存
        res.setHeader('Cache-Control', 'max-age=-1');
      }

      // 设置文件大小
      res.setHeader('Content-Length', fileSize.toString());

      // 返回文件流
      fileStream.pipe(res);
    } catch (error) {
      console.error('文件下载失败:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('文件下载失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private getContentType(suffix: string): string {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
      txt: 'text/plain',
      json: 'application/json',
    };

    return mimeTypes[suffix.toLowerCase()] || 'application/octet-stream';
  }
}
