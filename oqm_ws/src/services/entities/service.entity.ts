import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceTypeEnum } from '../enums/service-type.enum';
import { CounterServiceEntity } from './counter-service.entity';

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ServiceTypeEnum,
    default: ServiceTypeEnum.CUSTOMER_SUPPORT,
  })
  type: ServiceTypeEnum;

  @Column({ type: 'bigint', nullable: false })
  time: number;

  @OneToMany(
    () => CounterServiceEntity,
    (counterService) => counterService.counter,
  )
  counterServices: CounterServiceEntity[];
}
