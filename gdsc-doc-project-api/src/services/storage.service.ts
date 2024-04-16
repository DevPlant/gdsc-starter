import {
  CreateBucketCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
      endpoint: process.env.ENDPOINT,
      forcePathStyle: true,
    });
    this.s3
      .send(new CreateBucketCommand({ Bucket: process.env.BUCKET_NAME }))
      .then()
      .catch(() => {});
  }

  async uploadFile(id: number, file: Express.Multer.File) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${id}`,
        Body: file.buffer,
      }),
    );
  }

  async downloadFile(id: number) {
    const response = await this.s3.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${id}`,
      }),
    );
    return response.Body;
  }
}
