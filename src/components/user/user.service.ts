import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserServiceInterface } from './interface/user-service.interface';
import { UserDocument, UserEntity } from './schemas/user.schema';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectModel(UserEntity.name)
    private UserModel: Model<UserDocument>,
  ) {}

  async find({
    current,
    page,
    search,
  }): Promise<[LeanDocument<UserEntity[]>, number]> {
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: `${search}.*`, $options: 'i' } },
        { email: { $regex: `${search}.*`, $options: 'i' } },
      ];
    }

    const countUsers = await this.UserModel.countDocuments(filter);
    const result = await this.UserModel.find(filter)
      .limit(page)
      .skip(page * (current - 1))
      .lean();
    return [result, countUsers];
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const alreadyExist = await this.UserModel.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    }).lean();

    if (alreadyExist) {
      throw new HttpException(
        'There is already a registered user with the email/phone number provided.',
        HttpStatus.CONFLICT,
      );
    }

    return this.UserModel.create(data);
  }
}
