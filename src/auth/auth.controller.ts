import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../model/auth.model';
import { CommonResponse } from '../model/common-response.model';
import { Auth } from './auth.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: RegisterResponse,
  })
  @ApiBody({ type: RegisterRequest })
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
  @ApiOperation({ summary: 'Login to the system' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
    type: LoginResponse,
  })
  @ApiBody({ type: LoginRequest })
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

  @Post('logout')
  @ApiOperation({ summary: 'Logout from the system' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged out successfully',
    type: Boolean,
  })
  @HttpCode(200)
  async logout(@Auth() token: string): Promise<CommonResponse<boolean>> {
    const response = await this.authService.logout(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'User logged out successfully',
      data: response,
    };
  }
}
