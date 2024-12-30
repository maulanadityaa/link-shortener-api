import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({ example: 'test_email@mail.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'test_password', description: 'Password' })
  password: string;

  @ApiProperty({ example: 'test_name', description: 'Name' })
  name: string;
}

export class LoginRequest {
  @ApiProperty({ example: 'test_email@mail.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'test_password', description: 'Password' })
  password: string;
}

export class RegisterResponse {
  @ApiProperty({ example: 'test_email@mail.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'test_name', description: 'Name' })
  name: string;
}

export class LoginResponse {
  @ApiProperty({ example: 'validJwtToken', description: 'Token' })
  token: string;
}
