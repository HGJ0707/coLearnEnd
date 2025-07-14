import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { nanoid } from 'nanoid';
import { join } from 'path';
import {
  writeFileSync,
  mkdirSync,
  existsSync,
  statSync,
  createReadStream,
} from 'fs';
import { fileIdMap, uploadPath, docPath, videoPath, imgPath } from '../const';

type UploadFileType = 'doc' | 'img' | 'video';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  uploadFile(type: UploadFileType, file: Express.Multer.File) {
    try {
      // 生成唯一的文件名
      const finalFileName = nanoid() + '.' + file.originalname.split('.').pop();

      // 确定目标目录
      let targetDir = uploadPath;
      switch (type) {
        case 'doc':
          targetDir = docPath;
          break;
        case 'img':
          targetDir = imgPath;
          break;
        case 'video':
          targetDir = videoPath;
          break;
      }

      // 确保目标目录存在
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      // 构建目标文件路径
      const targetFilePath = join(targetDir, finalFileName);

      // 直接写入文件到目标路径
      writeFileSync(targetFilePath, file.buffer);

      // 构建返回给前端的文件ID
      const fileId = fileIdMap[type] + '/' + finalFileName;

      return {
        url: fileId,
      };
    } catch (error) {
      console.error('文件上传失败:', error);
      throw new Error('文件上传失败');
    }
  }

  getResource(fileId: string) {
    try {
      const fileTargetPath = join(__dirname, '../../', fileId);

      // 检查文件是否存在
      if (!existsSync(fileTargetPath)) {
        throw new Error('文件不存在');
      }

      const suffixReg = /\.([a-zA-Z0-9]*)$/;
      const suffix = fileId.match(suffixReg)?.[1] || '';

      const fileSize = statSync(fileTargetPath).size;

      // 创建文件流
      const fileStream = createReadStream(fileTargetPath);

      return {
        fileStream,
        fileSize,
        suffix,
        fileTargetPath,
      };
    } catch (error) {
      console.error('获取文件失败:', error);
      throw new Error('获取文件失败');
    }
  }
}
