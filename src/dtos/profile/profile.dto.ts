import { z } from "zod";

export const DepositSchema = z.object({
  id: z.string().uuid(),
  amount: z.number(),
  gateway: z.string(),
  returnUrl: z.string(),
});
export type DepositItem = z.infer<typeof DepositSchema>;

export const BookingHistorySchema = z.object({
  id: z.string().uuid(),
  totalAmount: z.number(),
  planName: z.string(),
  status: z.string(),
  mentor: z.string(),
  createdAt: z.string().datetime(),
});
export type BookingHistoryItem = z.infer<typeof BookingHistorySchema>;
