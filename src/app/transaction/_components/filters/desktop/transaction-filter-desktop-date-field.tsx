"use client";

import type { DateRange } from "react-day-picker";
import { useQueryStates } from "nuqs";
import { Field, FieldLabel } from "@/components/ui/field";
import { transactionSearchParamsParsers } from "../../../_params/transaction-search-params";
import {
  parseTransactionDateRange,
  serializeTransactionDate,
} from "../../../_utils/transaction-date-range";
import { TransactionFilterDatePicker } from "../shared/transaction-filter-date-picker";

export function TransactionFilterDesktopDateField() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);
  const value = parseTransactionDateRange(filters.from, filters.to);

  function handleApply(range: DateRange | undefined) {
    void setFilters({
      from: serializeTransactionDate(range?.from),
      to: serializeTransactionDate(range?.to),
      page: 1,
    });
  }

  return (
    <Field className="hidden gap-2 lg:flex">
      <FieldLabel>بازه زمانی</FieldLabel>
      <TransactionFilterDatePicker
        value={value}
        onApply={handleApply}
        triggerClassName="h-11 w-full justify-between"
      />
    </Field>
  );
}
