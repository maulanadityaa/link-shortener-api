import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtService } from '../jwt/jwt.service';
import { UserResponse, UserUpdateRequest } from '../model/user.model';
import { ValidationService } from '../common/validation.service';
import * as bcrypt from 'bcrypt';
import { UserValidation } from './user.validation';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private jwtService: JwtService,
    private validationService: ValidationService,
  ) {}

  async getUser(token: string): Promise<UserResponse> {
    this.logger.debug(`Getting user ${token}`);

    const decodedUser = await this.jwtService.verifyToken(token);

    const user = await this.prismaService.user.findUnique({
      where: {
        id: decodedUser.userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    } else if (!user.is_login) {
      throw new HttpException('User is not login', 401);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async update(
    token: string,
    id: string,
    request: UserUpdateRequest,
  ): Promise<UserResponse> {
    this.logger.debug(`Updating user ${JSON.stringify(request)}`);

    const updateRequest: UserUpdateRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    const decodedUser = await this.jwtService.verifyToken(token);
    if (decodedUser.userId !== id) {
      throw new HttpException('User not found', 404);
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    } else if (!user.is_login) {
      throw new HttpException('User is not login', 401);
    }

    if (updateRequest.password) {
      updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    };
  }
}
