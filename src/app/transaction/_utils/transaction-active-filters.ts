import type { TransactionFilterParams } from "../_types/transaction";

export type FilterParamsForCount = Partial<Pick<TransactionFilterParams, "status" | "from" | "to">>;

export function countSelectedFilters(filters: FilterParamsForCount): number {
  let count = 0;
  if (filters.status && filters.status !== "ALL") {
    count += 1;
  }
  if (filters.from || filters.to) {
    count += 1;
  }
  return count;
}
