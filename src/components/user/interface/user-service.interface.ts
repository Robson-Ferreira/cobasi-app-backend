import { LeanDocument } from 'mongoose';
import { UserEntity } from '../schemas/user.schema';

export interface UserServiceInterface {
  find(query: any): Promise<[LeanDocument<UserEntity[]>, number]>;
}
