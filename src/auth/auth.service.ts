import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validation.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from '../model/auth.model';
import { AuthValidation } from './auth.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterRequest): Promise<UserResponse> {
    this.logger.debug(`Registering user ${JSON.stringify(request)}`);

    const registerRequest: RegisterRequest = this.validationService.validate(
      AuthValidation.REGISTER,
      request,
    );

    const existingUser = await this.prismaService.user.count({
      where: {
        email: registerRequest.email,
      },
    });
    if (existingUser !== 0) {
      throw new HttpException('Email already registered', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    const user = await this.prismaService.user.create({
      data: registerRequest,
    });

    return {
      email: user.email,
      name: user.name,
    };
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    this.logger.debug(`Logging in user ${JSON.stringify(request)}`);

    const loginRequest: LoginRequest = this.validationService.validate(
      AuthValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });
    if (!user) {
      throw new HttpException('Invalid email or password', 401);
    }

    const passwordMatch = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new HttpException('Invalid email or password', 401);
    }

    const token = await this.jwtService.generateToken(user);

    return {
      token: token,
    };
  }
}
