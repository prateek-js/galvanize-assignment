// product.entity.ts
import { Entity, Column } from 'typeorm';
import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  productname: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  cost: string;

  @Column({ type: 'varchar', length: 300 })
  viewCount: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
