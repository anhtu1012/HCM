import { z } from "zod";

/**
 * Schema and type for permision auth keycloack
 */
export enum Role {
  ADMIN = "admin",
  Customer = "user",
}

export const AccountSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum([Role.ADMIN, Role.Customer]),
});

export type Account = z.infer<typeof AccountSchema>;

export const UserInforSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  account: AccountSchema,
  balance: z.number(),
});
export type UserInfor = z.infer<typeof UserInforSchema>;
