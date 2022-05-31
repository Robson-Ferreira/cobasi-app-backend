import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RequestPaginateDto } from 'src/commons/dtos/request-paginated.dto';

export class FilterPaginatedUserDto extends RequestPaginateDto {
  @ApiPropertyOptional({
    description: 'Search by name or email',
    type: String,
    required: false,
  })
  @IsOptional()
  search?: string | null;
}
