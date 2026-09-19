"use client";

import { useState } from "react";
import { CalendarDaysIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { transactionSearchParamsParsers } from "../../_params/transaction-search-params";
import {
  formatTransactionDateRange,
  parseTransactionDateRange,
  serializeTransactionDate,
} from "../../_utils/transaction-date-range";
import { TransactionDateRangeCalendar } from "./transaction-filter-date-range-calendar";

export function TransactionDesktopDateFilter() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);
  const [isOpen, setIsOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(() =>
    parseTransactionDateRange(filters.from, filters.to)
  );

  function handleOpenChange(open: boolean) {
    if (open) {
      setDraftRange(parseTransactionDateRange(filters.from, filters.to));
    }
    setIsOpen(open);
  }

  function applyDateRange() {
    void setFilters({
      from: serializeTransactionDate(draftRange?.from),
      to: serializeTransactionDate(draftRange?.to),
      page: 1,
    });
    setIsOpen(false);
  }

  return (
    <Field className="hidden gap-2 lg:flex">
      <FieldLabel>بازه زمانی</FieldLabel>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          render={
            <Button type="button" variant="outline" className="h-11 w-full justify-between" />
          }
        >
          <CalendarDaysIcon data-icon="inline-start" aria-hidden="true" />
          <span className="truncate">{formatTransactionDateRange(filters.from, filters.to)}</span>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto gap-3 p-3">
          <TransactionDateRangeCalendar value={draftRange} onChange={setDraftRange} />
          <div className="flex items-center justify-between gap-2">
            <Button type="button" variant="ghost" onClick={() => setDraftRange(undefined)}>
              پاک کردن
            </Button>
            <Button type="button" onClick={applyDateRange}>
              اعمال بازه
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
