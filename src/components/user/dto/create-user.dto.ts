import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User E-mail',
    type: String,
    example: faker.internet.email(),
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
    example: faker.name.findName(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User Phone',
    type: String,
    example: faker.phone.phoneNumber('(33) 33333-3333'),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
