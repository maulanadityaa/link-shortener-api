import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly UPDATE: ZodType = z.object({
    email: z.string().email().optional(),
    password: z.string().min(8).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
  });
}
