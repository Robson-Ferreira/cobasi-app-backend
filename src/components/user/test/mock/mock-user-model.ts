import { mockUser, mockUsers } from './mock-user-service';

export const mockedUsers = mockUsers();
export const mockedUser = mockUser();

export class UserModelSpy {
  constructor(public data: any) {}

  static find = () => {
    return {
      limit: () => {
        return {
          skip: () => {
            return {
              lean: () => {
                return mockedUsers;
              },
            };
          },
        };
      },
    };
  };

  static countDocuments = jest.fn().mockResolvedValue(mockedUsers.length);

  static create = jest.fn().mockResolvedValue(mockedUser);

  static findOne = () => {
    return {
      lean: jest.fn().mockResolvedValue(null),
    };
  };
}
