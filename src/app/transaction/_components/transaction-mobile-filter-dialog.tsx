"use client";

import { useState } from "react";
import { CalendarDaysIcon, FilterIcon, XIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { transactionSearchParamsParsers } from "../_params/transaction-search-params";
import {
  formatTransactionDateRange,
  parseTransactionDateRange,
  serializeTransactionDate,
} from "../_utils/transaction-date-range";
import type { TransactionStatusFilter } from "../_utils/transaction-filter-options";
import { TransactionDateRangeCalendar } from "./transaction-date-range-calendar";
import { TransactionStatusSelect } from "./transaction-status-select";

const MOBILE_FILTER_FIELD_COUNT = 2;

export function TransactionMobileFilterDialog() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);
  const [isOpen, setIsOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState<TransactionStatusFilter>(filters.status);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(() =>
    parseTransactionDateRange(filters.from, filters.to)
  );
  const draftDateRangeLabel = formatTransactionDateRange(
    serializeTransactionDate(draftRange?.from),
    serializeTransactionDate(draftRange?.to)
  );

  function handleOpenChange(open: boolean) {
    if (open) {
      setDraftStatus(filters.status);
      setDraftRange(parseTransactionDateRange(filters.from, filters.to));
    }
    setIsOpen(open);
  }

  function applyFilters() {
    void setFilters({
      status: draftStatus,
      from: serializeTransactionDate(draftRange?.from),
      to: serializeTransactionDate(draftRange?.to),
      page: 1,
    });
    setIsOpen(false);
  }

  function clearFilters() {
    setDraftStatus("ALL");
    setDraftRange(undefined);
    void setFilters({ search: "", status: "ALL", from: "", to: "", page: 1 });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="relative size-12 lg:hidden"
            aria-label="باز کردن فیلترها"
          />
        }
      >
        <FilterIcon aria-hidden="true" />
        <span
          aria-hidden="true"
          className="bg-primary text-primary-foreground absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] tabular-nums"
        >
          {MOBILE_FILTER_FIELD_COUNT.toLocaleString("fa-IR")}
        </span>
      </DialogTrigger>
      <DialogContent
        className="inset-4 flex h-auto w-auto max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-2xl p-0 sm:max-w-none rtl:translate-x-0"
        showCloseButton={false}
      >
        <DialogClose
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute start-3 top-3"
              aria-label="بستن فیلترها"
            />
          }
        >
          <XIcon aria-hidden="true" />
        </DialogClose>
        <DialogHeader className="min-h-14 justify-center px-14 py-3 text-center">
          <DialogTitle>فیلترها</DialogTitle>
        </DialogHeader>
        <Separator />
        <FieldGroup className="flex-1 gap-5 p-4">
          <Field className="gap-2">
            <FieldLabel>وضعیت</FieldLabel>
            <TransactionStatusSelect
              ariaLabel="وضعیت تراکنش در پنجره فیلترها"
              value={draftStatus}
              onChange={(value) => setDraftStatus(value ?? "ALL")}
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel>بازه زمانی</FieldLabel>
            <Popover>
              <PopoverTrigger
                render={
                  <Button type="button" variant="outline" className="h-12 w-full justify-between" />
                }
              >
                <CalendarDaysIcon data-icon="inline-start" aria-hidden="true" />
                <span className="truncate">{draftDateRangeLabel}</span>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-3">
                <TransactionDateRangeCalendar value={draftRange} onChange={setDraftRange} />
              </PopoverContent>
            </Popover>
          </Field>
        </FieldGroup>
        <Separator />
        <DialogFooter className="grid grid-cols-2 p-4">
          <Button type="button" variant="outline" className="h-11" onClick={clearFilters}>
            پاک کردن فیلترها
          </Button>
          <Button type="button" className="h-11" onClick={applyFilters}>
            اعمال فیلترها
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
