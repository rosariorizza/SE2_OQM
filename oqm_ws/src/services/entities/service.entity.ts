import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CounterServiceEntity } from './counter-service.entity';

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'bigint', nullable: false })
  time: number;

  @OneToMany(
    () => CounterServiceEntity,
    (counterService) => counterService.counter,
  )
  counterServices: CounterServiceEntity[];
}
