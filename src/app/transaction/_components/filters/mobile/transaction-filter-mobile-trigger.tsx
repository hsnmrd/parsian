"use client";

import { FilterIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { transactionSearchParamsParsers } from "../../../_params/transaction-search-params";
import { countSelectedFilters } from "../../../_utils/transaction-active-filters";

export function TransactionFilterMobileTrigger() {
  const [filters] = useQueryStates(transactionSearchParamsParsers);
  const activeCount = countSelectedFilters(filters);
  const hasActiveFilters = activeCount > 0;

  return (
    <DrawerTrigger
      render={
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="relative size-12 lg:hidden"
          aria-label={
            hasActiveFilters
              ? `باز کردن فیلترها (${activeCount.toLocaleString("fa-IR")} فیلتر انتخاب شده)`
              : "باز کردن فیلترها"
          }
        />
      }
    >
      <FilterIcon aria-hidden="true" />
      {hasActiveFilters && (
        <span
          aria-hidden="true"
          className="bg-primary text-primary-foreground absolute -start-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] tabular-nums"
        >
          {activeCount.toLocaleString("fa-IR")}
        </span>
      )}
    </DrawerTrigger>
  );
}
