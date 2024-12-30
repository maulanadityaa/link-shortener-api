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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get user details',
    description:
      'This endpoint requires a valid access token for authorization.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully',
    type: UserResponse,
  })
  @ApiBearerAuth()
  async getUser(@Auth() token: string): Promise<CommonResponse<UserResponse>> {
    const response = await this.userService.getUser(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: response,
    };
  }

  @Patch(':id/update')
  @ApiOperation({
    summary: 'Update user information',
    description:
      'This endpoint requires a valid access token for authorization.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UserResponse,
  })
  @ApiBearerAuth()
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
