"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.UPDATE = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8).max(255).optional(),
    name: zod_1.z.string().min(1).max(255).optional(),
});
//# sourceMappingURL=user.validation.js.map