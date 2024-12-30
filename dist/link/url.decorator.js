"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
const common_1 = require("@nestjs/common");
exports.Url = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.protocol + '://' + request.get('host');
});
//# sourceMappingURL=url.decorator.js.map