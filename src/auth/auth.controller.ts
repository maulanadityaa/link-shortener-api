import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from '../model/auth.model';
import { CommonResponse } from '../model/common-response.model';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() request: RegisterRequest,
  ): Promise<CommonResponse<UserResponse>> {
    const response = await this.authService.register(request);

    return {
      statusCode: 201,
      message: 'User registered successfully',
      data: response,
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() request: LoginRequest,
  ): Promise<CommonResponse<LoginResponse>> {
    const response = await this.authService.login(request);

    return {
      statusCode: 200,
      message: 'User logged in successfully',
      data: response,
    };
  }
}
