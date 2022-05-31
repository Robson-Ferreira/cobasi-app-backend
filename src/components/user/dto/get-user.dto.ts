import { faker } from '@faker-js/faker';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    description: 'User Id',
    type: String,
    example: faker.datatype.uuid(),
    required: true,
  })
  _id: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
    example: faker.name.findName(),
    required: true,
  })
  name: string;

  @ApiPropertyOptional({
    description: 'User email',
    type: String,
    example: faker.internet.email(),
    required: true,
  })
  email: string;

  @ApiPropertyOptional({
    description: 'User Phone',
    type: String,
    example: faker.phone.phoneNumber('(33) 33333-3333'),
    required: true,
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'User createdAt',
    type: Date,
    example: new Date(),
    required: true,
  })
  createdAt?: string;

  @ApiPropertyOptional({
    description: 'User updatedAt',
    type: Date,
    example: new Date(),
    required: true,
  })
  updatedAt?: string;
}
