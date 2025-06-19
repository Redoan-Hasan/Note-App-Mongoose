import { z } from "zod";

export const userZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['user', 'admin']).optional()
})