import { ApiProperty } from '@nestjs/swagger';

export abstract class PaginatedResults<T> {
  data: T[];

  @ApiProperty()
  current: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;

  constructor(data: T[], total: number, current: number, page: number) {
    this.data = data;
    this.count = data.length;
    this.total = total;
    this.current = current;
    this.page = page;
  }
}
