import { z } from "zod";
import { UserInforSchema } from "./auth.dto";

/**
 * Schema and type for response auth login
 */
export const UserResponseLoginSchema = z.object({
  message: z.string(),
  ok: z.boolean(),
  user_info: UserInforSchema,
});

export type UserResponseLoginItem = z.infer<typeof UserResponseLoginSchema>;

export const UserResponseLogoutSchema = z.object({
  is_clear_cookie: z.boolean(),
  message: z.string(),
  ok: z.boolean(),
});

export type UserResponseLogoutItem = z.infer<typeof UserResponseLogoutSchema>;

/**
 * Schema and type for response auth registration
 */
export const UserResponseRegisterSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user_id: z.string().optional(),
});

export type UserResponseRegisterItem = z.infer<
  typeof UserResponseRegisterSchema
>;

export const UserResponseGetUserSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: UserInforSchema,
});

export type UserResponseGetUserItem = z.infer<typeof UserResponseGetUserSchema>;
