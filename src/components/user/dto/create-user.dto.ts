import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User E-mail',
    type: String,
    example: 'email@email.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
    example: 'Lucas Amadeu',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
