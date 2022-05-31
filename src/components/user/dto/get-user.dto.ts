import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserDto {
  @ApiPropertyOptional({
    description: 'User id',
    type: String,
    example: '6126e04cc6151e00306b9820',
    required: true,
  })
  id: string;

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
