import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './services/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from './entities/file.entity';
import { Auth } from './auth/auth';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Auth()
  @Post('/files/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  @Auth()
  @Get('/files')
  getAllFiles(): Promise<FileEntity[]> {
    return this.fileService.getAllFiles();
  }

  @Auth()
  @Delete('/files/:id')
  deleteFile(@Param('id') id: number): Promise<void> {
    return this.fileService.deleteFile(id);
  }

  @Auth()
  @Get('/files/:id/download')
  async downloadFile(
    @Param('id') id: number,
    @Res() response: Response,
  ){
    const file = await this.fileService.getFile(id);
    const buffer = await this.fileService.downloadFile(id);
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader('Content-Length', file.size.toString());
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.name}"`,
    );
    response.send(await buffer.transformToByteArray());
  }
}
