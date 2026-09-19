"use client";

import { RotateCcwIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { transactionSearchParamsParsers } from "../../_params/transaction-search-params";

export function TransactionClearFiltersButton() {
  const [filters, setFilters] = useQueryStates(transactionSearchParamsParsers);
  const hasFilters = Boolean(
    filters.search || filters.status !== "ALL" || filters.from || filters.to
  );

  function clearFilters() {
    void setFilters({ search: "", status: "ALL", from: "", to: "", page: 1 });
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!hasFilters}
      onClick={clearFilters}
      className="hidden h-11 lg:flex"
    >
      <RotateCcwIcon data-icon="inline-start" aria-hidden="true" />
      پاک کردن فیلترها
    </Button>
  );
}
