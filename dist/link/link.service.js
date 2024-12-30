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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const validation_service_1 = require("../common/validation.service");
const jwt_service_1 = require("../jwt/jwt.service");
const link_validation_1 = require("./link.validation");
const crypto_1 = require("crypto");
let LinkService = class LinkService {
    constructor(prismaService, logger, validationService, jwtService) {
        this.prismaService = prismaService;
        this.logger = logger;
        this.validationService = validationService;
        this.jwtService = jwtService;
    }
    async generateRandomString(length = 8) {
        return (0, crypto_1.randomBytes)(length)
            .toString('base64')
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, length);
    }
    async createWithUser(token, url, request) {
        this.logger.debug(`Creating link with data ${JSON.stringify(request)}`);
        const createRequest = this.validationService.validate(link_validation_1.LinkValidation.CREATE, request);
        const decodedUser = await this.jwtService.verifyToken(token);
        const user = await this.prismaService.user.findFirst({
            where: {
                id: decodedUser.userId,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        else if (!user.is_login) {
            throw new common_1.HttpException('User is not login', 400);
        }
        let shorUrl;
        if (createRequest.title) {
            const title = await this.prismaService.link.count({
                where: {
                    title: createRequest.title,
                },
            });
            if (title > 0) {
                throw new common_1.HttpException('Title already exists', 400);
            }
            shorUrl = url + '/r/' + createRequest.title;
        }
        else {
            shorUrl = url + '/r/' + (await this.generateRandomString());
        }
        const link = await this.prismaService.link.create({
            data: {
                title: createRequest.title,
                url: createRequest.url,
                short_url: shorUrl,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        return {
            id: link.id,
            url: link.url,
            shortUrl: link.short_url,
        };
    }
    async createWithoutUser(url, request) {
        this.logger.debug(`Creating link with data ${JSON.stringify(request)}`);
        const createRequest = this.validationService.validate(link_validation_1.LinkValidation.CREATE, request);
        const shorUrl = url + '/r/' + (await this.generateRandomString());
        const link = await this.prismaService.link.create({
            data: {
                title: createRequest.title,
                url: createRequest.url,
                short_url: shorUrl,
            },
        });
        return {
            id: link.id,
            url: link.url,
            shortUrl: link.short_url,
        };
    }
    async getLink(shortUrl, url) {
        this.logger.debug(`Getting link with short url ${shortUrl}`);
        const link = await this.prismaService.link.findFirst({
            where: {
                short_url: url + '/r/' + shortUrl,
            },
        });
        if (!link) {
            throw new common_1.HttpException('Link not found', 404);
        }
        await this.prismaService.link.update({
            where: {
                id: link.id,
            },
            data: {
                visit: link.visit + 1,
            },
        });
        return link.url;
    }
    async getLinksPerUser(token, request) {
        this.logger.debug(`Getting links per user`);
        const searchRequest = this.validationService.validate(link_validation_1.LinkValidation.SEARCH, request);
        const decodedUser = await this.jwtService.verifyToken(token);
        const user = await this.prismaService.user.findFirst({
            where: {
                id: decodedUser.userId,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        let filters = [];
        if (searchRequest.title) {
            filters.push({
                title: {
                    contains: searchRequest.title,
                    mode: 'insensitive',
                },
            });
        }
        const skip = (searchRequest.page - 1) * searchRequest.rowsPerPage;
        const links = await this.prismaService.link.findMany({
            where: {
                AND: [
                    {
                        user_id: user.id,
                    },
                    ...filters,
                ],
            },
            skip: skip,
            take: searchRequest.rowsPerPage,
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Links found',
            data: links.map((link) => {
                return {
                    id: link.id,
                    url: link.url,
                    shortUrl: link.short_url,
                };
            }),
            paging: {
                currentPage: searchRequest.page,
                totalPage: Math.ceil(links.length / searchRequest.rowsPerPage),
                size: searchRequest.size,
                totalRows: links.length,
            },
        };
    }
    async deleteLink(token, id) {
        this.logger.debug(`Deleting link with id ${id}`);
        const decodedUser = await this.jwtService.verifyToken(token);
        const user = await this.prismaService.user.findFirst({
            where: {
                id: decodedUser.userId,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        const link = await this.prismaService.link.findFirst({
            where: {
                id: id,
            },
        });
        if (!link) {
            throw new common_1.HttpException('Link not found', 404);
        }
        else if (link.user_id !== user.id) {
            throw new common_1.HttpException('Unauthorized', 401);
        }
        await this.prismaService.link.delete({
            where: {
                id: link.id,
            },
        });
        return true;
    }
};
exports.LinkService = LinkService;
exports.LinkService = LinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        winston_1.Logger,
        validation_service_1.ValidationService,
        jwt_service_1.JwtService])
], LinkService);
//# sourceMappingURL=link.service.js.map