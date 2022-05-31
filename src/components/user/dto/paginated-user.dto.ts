import { PaginatedResults } from '../../../commons/dtos';
import { GetUserDto } from './get-user.dto';

export class PaginateUserDto extends PaginatedResults<GetUserDto> {
  constructor(data: GetUserDto[], page: number, pageSize: number) {
    super(data, page, pageSize);
  }
}
