"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
let ErrorFilter = class ErrorFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        if (exception instanceof zod_1.ZodError) {
            response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Validation Error',
                errors: exception.errors.map((error) => ({
                    field: error.path.join('.'),
                    message: error.message,
                })),
            });
        }
        else if (exception instanceof common_1.HttpException) {
            response.status(exception.getStatus()).json({
                statusCode: exception.getStatus(),
                message: 'An error occurred',
                errors: exception.getResponse(),
            });
        }
        else {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
    }
};
exports.ErrorFilter = ErrorFilter;
exports.ErrorFilter = ErrorFilter = __decorate([
    (0, common_1.Catch)(zod_1.ZodError, common_1.HttpException)
], ErrorFilter);
//# sourceMappingURL=error.filter.js.map