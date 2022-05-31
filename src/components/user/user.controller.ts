import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FilterPaginatedUserDto } from './dto/filter.paginated.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PaginateUserDto } from './dto/paginated-user.dto';
import { UserServiceInterface } from './interface/user-service.interface';

@Controller('users')
export class UserController {
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
  async create(@Body(ValidationPipe) data: GetUserDto): Promise<any> {
    return data;
  }
}
