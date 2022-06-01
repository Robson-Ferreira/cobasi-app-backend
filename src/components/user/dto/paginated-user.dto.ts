import { PaginatedResults } from '../../../commons/dtos';
import { GetUserDto } from './get-user.dto';

export class PaginateUserDto extends PaginatedResults<GetUserDto> {
  constructor(
    data: GetUserDto[],
    total: number,
    current: number,
    page: number,
  ) {
    super(data, total, current, page);
  }
}
