"use client";

import { useQueryStates } from "nuqs";
import { Field, FieldLabel } from "@/components/ui/field";
import { transactionSearchParamsParsers } from "../_params/transaction-search-params";
import type { TransactionStatusFilter as TransactionStatusFilterValue } from "../_utils/transaction-filter-options";
import { TransactionStatusSelect } from "./transaction-status-select";

export function TransactionStatusFilter() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);

  function handleStatusChange(value: TransactionStatusFilterValue | null) {
    void setFilters({ status: value ?? "ALL", page: 1 });
  }

  return (
    <Field className="gap-2">
      <FieldLabel className="sr-only lg:not-sr-only">وضعیت</FieldLabel>
      <TransactionStatusSelect
        ariaLabel="فیلتر وضعیت تراکنش"
        value={filters.status}
        onChange={handleStatusChange}
      />
    </Field>
  );
}
