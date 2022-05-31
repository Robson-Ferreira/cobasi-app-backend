import { LeanDocument } from 'mongoose';
import { UserServiceInterface } from '../../interface/user-service.interface';
import { UserEntity } from '../../schemas/user.schema';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../dto/create-user.dto';

export class UserServiceSpy implements UserServiceInterface {
  params: UserEntity[] = [];
  callsCount = 0;

  find(): Promise<[LeanDocument<UserEntity[]>, number]> {
    this.callsCount++;

    return Promise.resolve([this.params, this.params.length]);
  }

  create(data: CreateUserDto): Promise<UserEntity> {
    this.params.push(data as UserEntity);

    return Promise.resolve(data as UserEntity);
  }
}

export const mockUser = (): UserEntity =>
  ({
    name: faker.name.findName(),
    email: faker.internet.email(),
  } as UserEntity);

export const mockUsers = (): UserEntity[] => [
  mockUser(),
  mockUser(),
  mockUser(),
  mockUser(),
  mockUser(),
];
