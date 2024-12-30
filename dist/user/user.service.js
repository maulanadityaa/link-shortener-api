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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const jwt_service_1 = require("../jwt/jwt.service");
const validation_service_1 = require("../common/validation.service");
const bcrypt = require("bcrypt");
const user_validation_1 = require("./user.validation");
let UserService = class UserService {
    constructor(prismaService, logger, jwtService, validationService) {
        this.prismaService = prismaService;
        this.logger = logger;
        this.jwtService = jwtService;
        this.validationService = validationService;
    }
    async getUser(token) {
        this.logger.debug(`Getting user ${token}`);
        const decodedUser = await this.jwtService.verifyToken(token);
        const user = await this.prismaService.user.findUnique({
            where: {
                id: decodedUser.userId,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        else if (!user.is_login) {
            throw new common_1.HttpException('User is not login', 401);
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }
    async update(token, id, request) {
        this.logger.debug(`Updating user ${JSON.stringify(request)}`);
        const updateRequest = this.validationService.validate(user_validation_1.UserValidation.UPDATE, request);
        const decodedUser = await this.jwtService.verifyToken(token);
        if (decodedUser.userId !== id) {
            throw new common_1.HttpException('User not found', 404);
        }
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        else if (!user.is_login) {
            throw new common_1.HttpException('User is not login', 401);
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        winston_1.Logger,
        jwt_service_1.JwtService,
        validation_service_1.ValidationService])
], UserService);
//# sourceMappingURL=user.service.js.map