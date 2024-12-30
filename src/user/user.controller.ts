import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.decorator';
import { CommonResponse } from '../model/common-response.model';
import { UserResponse, UserUpdateRequest } from '../model/user.model';

@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getUser(@Auth() token: string): Promise<CommonResponse<UserResponse>> {
    const response = await this.userService.getUser(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: response,
    };
  }

  @Patch(':id/update')
  async update(
    @Auth() token: string,
    @Param('id') id: string,
    @Body() request: UserUpdateRequest,
  ): Promise<CommonResponse<UserResponse>> {
    const response = await this.userService.update(token, id, request);

    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: response,
    };
  }
}
