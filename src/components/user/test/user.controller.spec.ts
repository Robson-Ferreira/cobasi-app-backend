import { Test, TestingModule } from '@nestjs/testing';
import { GetUserDto } from '../dto/get-user.dto';
import { PaginateUserDto } from '../dto/paginated-user.dto';
import { UserServiceInterface } from '../interface/user-service.interface';
import { UserController } from '../user.controller';
import { mockUser, mockUsers, UserServiceSpy } from './mock/mock-user-service';

type SutTypes = {
  sut: UserController;
  userServiceSpy: UserServiceSpy;
};

const makeSut = async (): Promise<SutTypes> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserController,
      {
        provide: 'UserServiceInterface',
        useClass: UserServiceSpy,
      },
    ],
  }).compile();

  const sut = module.get<UserController>(UserController);
  const userServiceSpy = module.get<UserServiceInterface>(
    'UserServiceInterface',
  ) as UserServiceSpy;
  return { sut, userServiceSpy };
};

describe('UserController', () => {
  test('should return the correct paginated response when fetching all users', async () => {
    const { sut, userServiceSpy } = await makeSut();

    const mockedUsers = mockUsers();
    userServiceSpy.params = mockedUsers;

    const response = await sut.findAll({});

    expect(response).toEqual(
      new PaginateUserDto(mockedUsers as GetUserDto[], mockedUsers.length, 1),
    );
  });

  test('should return the correct response when fetching empty users', async () => {
    const { sut } = await makeSut();

    const response = await sut.findAll({});

    expect(response).toEqual(new PaginateUserDto([], 0, 1));
  });

  test('should successfully create a user', async () => {
    const { sut, userServiceSpy } = await makeSut();

    userServiceSpy.params = [];
    const mockedUser = mockUser();

    const response = await sut.create(mockedUser);

    expect(userServiceSpy.params).toHaveLength(1);
    expect(response).toEqual(mockedUser);
  });

  test('should successfully create a user', async () => {
    const { sut, userServiceSpy } = await makeSut();

    userServiceSpy.params = [];
    const mockedUser = mockUser();

    const response = await sut.create(mockedUser);

    expect(userServiceSpy.params).toHaveLength(1);
    expect(response).toEqual(mockedUser);
  });
});
