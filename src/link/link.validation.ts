import { z, ZodType } from 'zod';

export class LinkValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(3).max(20).optional(),
    url: z
      .string()
      .url()
      .refine(
        (url) => {
          return /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/.test(url);
        },
        {
          message: "URL must have a valid domain with a TLD (e.g., '.com')",
        },
      ),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(3).max(20).optional(),
    page: z.number().int().min(1).optional(),
    rowsPerPage: z.number().int().min(1).optional(),
  });
}
