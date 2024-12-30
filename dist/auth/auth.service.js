"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const validation_service_1 = require("../common/validation.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const prisma_service_1 = require("../common/prisma.service");
const auth_validation_1 = require("./auth.validation");
const bcrypt = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
let AuthService = class AuthService {
    constructor(validationService, logger, prismaService, jwtService) {
        this.validationService = validationService;
        this.logger = logger;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async register(request) {
        this.logger.debug(`Registering user ${JSON.stringify(request)}`);
        const registerRequest = this.validationService.validate(auth_validation_1.AuthValidation.REGISTER, request);
        const existingUser = await this.prismaService.user.count({
            where: {
                email: registerRequest.email,
            },
        });
        if (existingUser !== 0) {
            throw new common_1.HttpException('Email already registered', 400);
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
    async login(request) {
        this.logger.debug(`Logging in user ${JSON.stringify(request)}`);
        const loginRequest = this.validationService.validate(auth_validation_1.AuthValidation.LOGIN, request);
        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginRequest.email,
            },
        });
        if (!user) {
            throw new common_1.HttpException('Invalid email or password', 401);
        }
        const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);
        if (!passwordMatch) {
            throw new common_1.HttpException('Invalid email or password', 401);
        }
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                is_login: true,
            },
        });
        const token = await this.jwtService.generateToken(user);
        return {
            token: token,
        };
    }
    async logout(token) {
        this.logger.debug(`Logging out user with token ${token}`);
        const decodedUser = await this.jwtService.verifyToken(token);
        if (!decodedUser) {
            throw new common_1.HttpException('Invalid token', 401);
        }
        await this.prismaService.user.update({
            where: {
                id: decodedUser.userId,
            },
            data: {
                is_login: false,
            },
        });
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        winston_1.Logger,
        prisma_service_1.PrismaService,
        jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map