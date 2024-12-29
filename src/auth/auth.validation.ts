import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
    name: z.string().min(1).max(255),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    email: z.string().email().optional(),
    password: z.string().min(8).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
  });
}
