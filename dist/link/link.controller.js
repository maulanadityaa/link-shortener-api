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
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const link_service_1 = require("./link.service");
const auth_decorator_1 = require("../auth/auth.decorator");
const url_decorator_1 = require("./url.decorator");
const link_model_1 = require("../model/link.model");
const swagger_1 = require("@nestjs/swagger");
let LinkController = class LinkController {
    constructor(linkService) {
        this.linkService = linkService;
    }
    async createLink(token, url, request) {
        const response = await this.linkService.createWithUser(token, url, request);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Link created successfully',
            data: response,
        };
    }
    async createPublicLink(url, request) {
        const response = await this.linkService.createWithoutUser(url, request);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Link created successfully',
            data: response,
        };
    }
    async redirect(shortUrl, url, res) {
        const redirectUrl = await this.linkService.getLink(shortUrl, url);
        res.redirect(redirectUrl);
    }
    async getLinks(token, title, page = 1, rowsPerPage = 10) {
        const request = {
            title,
            page: parseInt(String(page)) || 1,
            rowsPerPage: parseInt(String(rowsPerPage)) || 10,
        };
        return await this.linkService.getLinksPerUser(token, request);
    }
    async deleteLink(token, id) {
        const response = await this.linkService.deleteLink(token, id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Link deleted successfully',
            data: response,
        };
    }
};
exports.LinkController = LinkController;
__decorate([
    (0, common_1.Post)('/api/v1/links'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new link for logged in user',
        description: 'This endpoint requires a valid access token for authorization.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Link created successfully',
        type: link_model_1.LinkResponse,
    }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiBody)({ type: link_model_1.LinkRequest }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, auth_decorator_1.Auth)()),
    __param(1, (0, url_decorator_1.Url)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, link_model_1.LinkRequest]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "createLink", null);
__decorate([
    (0, common_1.Post)('/api/v1/links/public'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new public link',
        description: 'This endpoint does not require any authorization. The title will be generated randomly',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Link created successfully',
        type: link_model_1.LinkResponse,
    }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiBody)({ type: link_model_1.LinkRequest }),
    __param(0, (0, url_decorator_1.Url)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, link_model_1.LinkRequest]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "createPublicLink", null);
__decorate([
    (0, common_1.Get)('/r/:shortUrl'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Param)('shortUrl')),
    __param(1, (0, url_decorator_1.Url)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "redirect", null);
__decorate([
    (0, common_1.Get)('/api/v1/links'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all links for logged in user',
        description: 'This endpoint requires a valid access token for authorization.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Links retrieved successfully',
        type: link_model_1.LinkResponse,
        isArray: true,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'title',
        description: 'Title',
        example: 'Title',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Page number (Optional) - default 1',
        example: 1,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'rowsPerPage',
        description: 'Rows per page (Optional) - default 10',
        example: 10,
        required: false,
    }),
    __param(0, (0, auth_decorator_1.Auth)()),
    __param(1, (0, common_1.Query)('title')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('rowsPerPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "getLinks", null);
__decorate([
    (0, common_1.Delete)('/api/v1/links/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a link for logged in user',
        description: 'This endpoint requires a valid access token for authorization.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Link deleted successfully',
        type: Boolean,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, auth_decorator_1.Auth)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "deleteLink", null);
exports.LinkController = LinkController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [link_service_1.LinkService])
], LinkController);
//# sourceMappingURL=link.controller.js.map