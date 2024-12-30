import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateRequest {
  @ApiProperty({ example: 'test_email@mail.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'test_name', description: 'Name' })
  name: string;

  @ApiProperty({ example: 'test_password', description: 'Password' })
  password: string;
}

export class UserResponse {
  @ApiProperty({ example: 'ValidUUIDv4', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'test_email@mail.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'test_name', description: 'Name' })
  name: string;
}
