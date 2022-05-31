import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RequestPaginateDto } from '../../../commons/dtos';

export class FilterPaginatedUserDto extends RequestPaginateDto {
  @ApiPropertyOptional({
    description: 'Search by name or email',
    type: String,
    required: false,
  })
  @IsOptional()
  search?: string | null;
}
