import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserDto {
  @ApiPropertyOptional({
    description: 'User name',
    type: String,
    example: 'Name User',
    required: true,
  })
  name: string;

  @ApiPropertyOptional({
    description: 'User email',
    type: String,
    example: 'user@email.com',
    required: true,
  })
  email: string;
}
