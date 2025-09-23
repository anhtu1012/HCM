import { z } from "zod";

/**
 * Schema and type for user login
 */

export const UserRequestLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserRequestLoginItem = z.infer<typeof UserRequestLoginSchema>;

/**
 * Schema and type for user registration
 */
export const UserRequestRegisterSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserRequestRegisterItem = z.infer<typeof UserRequestRegisterSchema>;

/**
 * Schema and type for user get permision
 */

export const PermisionRequestGetSchema = z.object({
  user_id: z.string(),
});

export type PermisionRequestGetItem = z.infer<typeof PermisionRequestGetSchema>;
