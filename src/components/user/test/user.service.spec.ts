import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../schemas/user.schema';
import { UserService } from '../user.service';
import { mockedUsers, mockedUser, UserModelSpy } from './mock/mock-user-model';

type SutTypes = {
  sut: UserService;
  UserModel: UserEntity;
};

const makeSut = async (): Promise<SutTypes> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: getModelToken(UserEntity.name),
        useValue: UserModelSpy,
      },
    ],
  }).compile();

  const sut = module.get<UserService>(UserService);
  const UserModel = module.get(getModelToken(UserEntity.name)) as UserEntity;
  return { sut, UserModel };
};

describe('UserService', () => {
  test('should return the correct response when fetching all users', async () => {
    const { sut } = await makeSut();

    const mockedUsersFromModel = mockedUsers;

    const query = {
      page: 1,
      pageSize: 20,
      search: null,
    };

    const response = await sut.find(query);

    expect(response).toEqual([
      mockedUsersFromModel,
      mockedUsersFromModel.length,
    ]);
  });

  test('should successfully create a user', async () => {
    const { sut } = await makeSut();

    const mockedUserFromModel = mockedUser;

    const response = await sut.create(mockedUserFromModel);

    expect(response).toStrictEqual(mockedUserFromModel);
  });
});
