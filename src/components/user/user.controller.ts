import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterPaginatedUserDto } from './dto/filter.paginated.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PaginateUserDto } from './dto/paginated-user.dto';
import { UserServiceInterface } from './interface/user-service.interface';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Get()
  async findAll(
    @Query() query?: FilterPaginatedUserDto,
  ): Promise<PaginateUserDto> {
    const { page = 1, perPage = 20, search } = query;

    const pageNumber = Number(page);
    const pageSize = Number(perPage);

    const [result, count] = await this.userService.find({
      page,
      pageSize,
      search,
    });

    return new PaginateUserDto(
      JSON.parse(JSON.stringify(result)),
      count,
      pageNumber,
      pageSize,
    );
  }

  @Post()
  async create(@Body(ValidationPipe) data: CreateUserDto): Promise<GetUserDto> {
    return this.userService.create(data);
  }
}
