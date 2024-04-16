import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { StorageService } from './services/storage.service';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './file.controller';
import { FileEntity } from './entities/file.entity';
import {FirebaseInit} from "./services/firebase-init.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forFeature([FileEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [FileEntity],
      synchronize: true,
    }),
  ],
  controllers: [FileController],
  providers: [FileService, StorageService, FirebaseInit],
})
export class AppModule {}
