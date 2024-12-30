"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkValidation = void 0;
const zod_1 = require("zod");
class LinkValidation {
}
exports.LinkValidation = LinkValidation;
LinkValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(3).max(20).optional(),
    url: zod_1.z
        .string()
        .url()
        .refine((url) => {
        return /https?:\/\/.*\.\w+$/.test(url);
    }, {
        message: "URL must have a valid domain with a TLD (e.g., '.com')",
    }),
});
LinkValidation.SEARCH = zod_1.z.object({
    title: zod_1.z.string().min(3).max(20).optional(),
    page: zod_1.z.number().int().min(1).optional(),
    rowsPerPage: zod_1.z.number().int().min(1).optional(),
});
//# sourceMappingURL=link.validation.js.map