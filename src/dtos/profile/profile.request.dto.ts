import { z } from "zod";
import { DepositSchema } from "./profile.dto";

export const DepositRequestSchema = DepositSchema.omit({
  id: true,
})
  .partial()
  .extend({
    amount: z.number().min(50000, "Số tiền nạp tối thiểu là 50.000đ"),
  });
export type DepositRequestItem = z.infer<typeof DepositRequestSchema>;
