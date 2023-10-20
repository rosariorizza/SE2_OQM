import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceTypeEnum } from '../enums/service-type.enum';

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: ServiceTypeEnum,
    default: ServiceTypeEnum.CUSTOMER_SUPPORT,
  })
  type: ServiceTypeEnum;
}
