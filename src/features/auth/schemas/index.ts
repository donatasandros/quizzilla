import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional().default(false)
});

export type SignInFormData = z.infer<typeof signInSchema>