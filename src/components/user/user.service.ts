import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserServiceInterface } from './interface/user-service.interface';
import { UserDocument, UserEntity } from './schemas/user.schema';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectModel(UserEntity.name)
    private UserModel: Model<UserDocument>,
  ) {}

  async find({
    page,
    pageSize,
    search,
  }): Promise<[LeanDocument<UserEntity[]>, number]> {
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: `${search}.*`, $options: 'i' } },
        { email: { $regex: `${search}.*`, $options: 'i' } },
      ];
    }

    const countUsers = await this.UserModel.countDocuments();
    const result = await this.UserModel.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();
    return [result, countUsers];
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const alreadyExist = await this.UserModel.findOne({
      email: data.email,
    }).lean();

    if (alreadyExist) {
      throw new HttpException('User already exists.', HttpStatus.CONFLICT);
    }

    return this.UserModel.create(data);
  }
}
