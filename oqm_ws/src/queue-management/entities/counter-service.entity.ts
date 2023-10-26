import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CounterEntity } from './counter.entity';
import { ServiceEntity } from './service.entity';

@Entity({ name: 'counter_service' })
export class CounterServiceEntity {
  @PrimaryColumn({ name: 'counter_id' })
  counterId: number;

  @PrimaryColumn({ name: 'service_id' })
  serviceId: number;

  @ManyToOne(() => CounterEntity, (counter) => counter.counterServices, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'counter_id', referencedColumnName: 'id' }])
  counter: CounterEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.counterServices, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'service_id', referencedColumnName: 'id' }])
  service: ServiceEntity;
}
