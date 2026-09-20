import { z } from "zod";
import { normalizeDigits } from "../_utils/normalize-digits";

export const transactionStatusSchema = z.enum(["Successful", "Failed", "Pending"]);

export type TransactionStatus = z.infer<typeof transactionStatusSchema>;

export const transactionSchema = z.object({
  id: z.number().int().positive(),
  cardNumber: z.string().length(16),
  amount: z.number().nonnegative(),
  status: transactionStatusSchema,
  transactionDate: z.string().datetime(),
  customerName: z.string().min(2),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionFilterSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10),
  search: z.string().optional().default("").transform(normalizeDigits),
  status: z.enum(["ALL", "Successful", "Failed", "Pending"]).catch("ALL"),
  from: z.string().optional().default(""),
  to: z.string().optional().default(""),
});

export type TransactionFilterParams = z.infer<typeof transactionFilterSchema>;

export const paginatedTransactionsSchema = z.object({
  data: z.array(transactionSchema),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    totalCount: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});

export type PaginatedTransactionsResponse = z.infer<typeof paginatedTransactionsSchema>;
