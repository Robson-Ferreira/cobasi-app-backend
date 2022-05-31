import { PaginatedResults } from 'src/commons/dtos/paginated-results.dto';
import { GetUserDto } from './get-user.dto';

export class PaginateUserDto extends PaginatedResults<GetUserDto> {
  constructor(
    data: GetUserDto[],
    count: number,
    page: number,
    pageSize: number,
  ) {
    super(data, count, page, pageSize);
  }
}
