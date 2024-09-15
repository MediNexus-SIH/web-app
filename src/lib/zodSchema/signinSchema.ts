import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;

