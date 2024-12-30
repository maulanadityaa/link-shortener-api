import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { JwtService } from '../jwt/jwt.service';
import { UserResponse, UserUpdateRequest } from '../model/user.model';
import { ValidationService } from '../common/validation.service';
export declare class UserService {
    private prismaService;
    private readonly logger;
    private jwtService;
    private validationService;
    constructor(prismaService: PrismaService, logger: Logger, jwtService: JwtService, validationService: ValidationService);
    getUser(token: string): Promise<UserResponse>;
    update(token: string, id: string, request: UserUpdateRequest): Promise<UserResponse>;
}
