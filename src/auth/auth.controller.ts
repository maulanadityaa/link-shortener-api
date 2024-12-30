import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../model/auth.model';
import { CommonResponse } from '../model/common-response.model';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() request: RegisterRequest,
  ): Promise<CommonResponse<RegisterResponse>> {
    const response = await this.authService.register(request);

    return {
      statusCode: HttpStatus.CREATED,
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
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      data: response,
    };
  }
}
