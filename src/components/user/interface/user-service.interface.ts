import { LeanDocument } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../schemas/user.schema';

export interface UserServiceInterface {
  find(query: any): Promise<[LeanDocument<UserEntity[]>, number]>;

  create(data: CreateUserDto): Promise<UserEntity>;
}
