import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CounterTypeEnum } from '../enums/counter-type.enum';
import { CounterServiceEntity } from './counter-service.entity';

@Entity({ name: 'counter' })
export class CounterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: CounterTypeEnum,
    nullable: false,
  })
  type: CounterTypeEnum;

  @OneToMany(
    () => CounterServiceEntity,
    (counterService) => counterService.counter,
  )
  counterServices: CounterServiceEntity[];
}
