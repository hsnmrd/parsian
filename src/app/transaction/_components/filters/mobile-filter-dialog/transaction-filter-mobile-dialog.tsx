"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useQueryStates } from "nuqs";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { transactionSearchParamsParsers } from "../../../_params/transaction-search-params";
import {
  parseTransactionDateRange,
  serializeTransactionDate,
} from "../../../_utils/transaction-date-range";
import type { TransactionStatusFilter } from "../../../_utils/transaction-filter-options";
import { TransactionFilterMobileDateField } from "./transaction-filter-mobile-date-field";
import { TransactionFilterMobileFooter } from "./transaction-filter-mobile-footer";
import { TransactionFilterMobileHeader } from "./transaction-filter-mobile-header";
import { TransactionFilterMobileStatusField } from "./transaction-filter-mobile-status-field";
import { TransactionFilterMobileTrigger } from "./transaction-filter-mobile-trigger";

export function TransactionMobileFilterDialog() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);
  const [isOpen, setIsOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState<TransactionStatusFilter>(filters.status);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(() =>
    parseTransactionDateRange(filters.from, filters.to)
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
    <Drawer open={isOpen} onOpenChange={handleOpenChange} showSwipeHandle>
      <TransactionFilterMobileTrigger />
      <DrawerContent className="rounded-t-2xl">
        <TransactionFilterMobileHeader />
        <Separator />
        <FieldGroup className="flex-1 gap-5 p-4">
          <TransactionFilterMobileStatusField value={draftStatus} onChange={setDraftStatus} />
          <TransactionFilterMobileDateField range={draftRange} onChange={setDraftRange} />
        </FieldGroup>
        <Separator />
        <TransactionFilterMobileFooter onClear={clearFilters} onApply={applyFilters} />
      </DrawerContent>
    </Drawer>
  );
}
