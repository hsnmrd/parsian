import type { TransactionFilterParams } from "../_types/transaction";

export type TransactionStatusFilter = TransactionFilterParams["status"];

export const TRANSACTION_STATUS_FILTERS: ReadonlyArray<{
  label: string;
  value: TransactionStatusFilter;
}> = [
  { label: "همه وضعیت‌ها", value: "ALL" },
  { label: "موفق", value: "Successful" },
  { label: "ناموفق", value: "Failed" },
  { label: "در انتظار", value: "Pending" },
];
