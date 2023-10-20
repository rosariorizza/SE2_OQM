import { UserRoleEnum } from '../enums/user-role.enum';

export class CreateUserDto {
  firstname: string;

  lastname: string;

  email: string;

  password: string;

  role: UserRoleEnum;
}
