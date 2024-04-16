import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_template')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  size: number;
  @Column()
  createdAt: Date;
}
