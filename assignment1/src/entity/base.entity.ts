import { Column } from 'typeorm';

export class BaseEntity {
  @Column({ name: 'createddate' })
  public createdDate: Date;

  @Column({ name: 'updateddate' })
  public updatedDate: Date;

  @Column({ name: 'isactive' })
  public isActive: boolean;
}

