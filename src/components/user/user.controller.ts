import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterPaginatedUserDto } from './dto/filter.paginated.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PaginateUserDto } from './dto/paginated-user.dto';
import { UserServiceInterface } from './interface/user-service.interface';
import { UserEntity } from './schemas/user.schema';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginateUserDto })
  async findAll(
    @Query() query?: FilterPaginatedUserDto,
  ): Promise<PaginateUserDto> {
    const { page = 1, perPage = 20, search } = query;

    const pageNumber = +page;
    const pageSize = +perPage;

    const [result, count] = await this.userService.find({
      page,
      pageSize,
      search,
    });

    return new PaginateUserDto(result as GetUserDto[], count, pageNumber);
  }

  @Post()
  @ApiOkResponse({ type: GetUserDto })
  async create(@Body(ValidationPipe) data: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(data);
  }
}
