import {
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileEntityRepository: Repository<FileEntity>,
    private storageService: StorageService,
  ) {

  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() uploadedFile: Express.Multer.File) {
    let file = new FileEntity();
    file.size = uploadedFile.size;
    file.name = uploadedFile.originalname;
    file.createdAt = new Date();

    file = await this.fileEntityRepository.save(file);
    await this.storageService.uploadFile(file.id, uploadedFile);

    return file;
  }

  getAllFiles(): Promise<FileEntity[]> {
    return this.fileEntityRepository.find();
  }

  async deleteFile(@Param('id') id: number): Promise<void> {
    await this.fileEntityRepository.delete(id);
  }

  getFile(id: number) {
    return this.fileEntityRepository.findOne({ where: { id } });
  }

  async downloadFile(id: number) {
    return this.storageService.downloadFile(id);
  }
}
