"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let SwaggerService = class SwaggerService {
    setupSwagger(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle(process.env.APP_NAME)
            .setDescription(process.env.APP_DESCRIPTION)
            .setVersion(process.env.APP_VERSION)
            .setContact(process.env.APP_AUTHOR_NAME, process.env.APP_AUTHOR_URL, process.env.APP_AUTHOR_EMAIL)
            .addBearerAuth()
            .addServer(process.env.APP_LOCAL_URL)
            .addServer(process.env.APP_PROD_URL)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/v1/docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            },
            customSiteTitle: 'Link Shortener API Documentation',
            customJs: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
            ],
            customCssUrl: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
            ],
        });
    }
};
exports.SwaggerService = SwaggerService;
exports.SwaggerService = SwaggerService = __decorate([
    (0, common_1.Injectable)()
], SwaggerService);
//# sourceMappingURL=swagger.service.js.map