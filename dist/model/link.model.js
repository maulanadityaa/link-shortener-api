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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkResponse = exports.LinkSearchRequest = exports.LinkRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
class LinkRequest {
}
exports.LinkRequest = LinkRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Title', description: 'Title' }),
    __metadata("design:type", String)
], LinkRequest.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.google.com', description: 'URL' }),
    __metadata("design:type", String)
], LinkRequest.prototype, "url", void 0);
class LinkSearchRequest {
}
exports.LinkSearchRequest = LinkSearchRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Title', description: 'Title (Optional)' }),
    __metadata("design:type", String)
], LinkSearchRequest.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Rows per page (Optional)' }),
    __metadata("design:type", Number)
], LinkSearchRequest.prototype, "rowsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Page number (Optional)' }),
    __metadata("design:type", Number)
], LinkSearchRequest.prototype, "page", void 0);
class LinkResponse {
}
exports.LinkResponse = LinkResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ValidUUIDv4', description: 'Link ID' }),
    __metadata("design:type", String)
], LinkResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: process.env.APP_PROD_URL + 'r/title',
        description: 'Shortened URL',
    }),
    __metadata("design:type", String)
], LinkResponse.prototype, "shortUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.google.com', description: 'URL' }),
    __metadata("design:type", String)
], LinkResponse.prototype, "url", void 0);
//# sourceMappingURL=link.model.js.map