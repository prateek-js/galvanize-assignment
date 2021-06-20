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

  @Column({ name: 'cost' , nullable: false, type: 'numeric', precision: 10, scale: 2, default: 0.0})
  public cost: number;

  @Column({ name: 'viewcount' })
  public viewCount: number;
}
