import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstname: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CUSTOMER,
  })
  role: UserRoleEnum;
}
