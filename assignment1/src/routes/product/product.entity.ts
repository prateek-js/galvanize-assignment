import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entity/base.entity';

@Entity('product')
export class Product extends BaseEntity {

  @PrimaryColumn({ name: 'productid' })
  public productId: string;

  @PrimaryColumn({ name: 'productname' })
  public productName: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'cost' })
  public cost: string;

  @Column({ name: 'viewcount' })
  public viewCount: number;
}
