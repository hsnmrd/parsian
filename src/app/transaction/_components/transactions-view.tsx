"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/use-media-query";
import { transactionsApi } from "../_api/transactions-api";
import { loadTransactionSearchParams } from "../_params/transaction-search-params";
import { TransactionFilters } from "./filters/transaction-filters";
import { TransactionResultsSkeleton } from "./results/shared/transaction-results-skeleton";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const TransactionDesktopResults = dynamic(
  () =>
    import("./results/desktop/transaction-desktop-results").then(
      (module) => module.TransactionDesktopResults
    ),
  {
    ssr: false,
    loading: () => <TransactionResultsSkeleton />,
  }
);

const TransactionMobileResults = dynamic(
  () =>
    import("./results/mobile/transaction-mobile-results").then(
      (module) => module.TransactionMobileResults
    ),
  {
    ssr: false,
    loading: () => <TransactionResultsSkeleton />,
  }
);

export function TransactionsView() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const filters = useMemo(() => loadTransactionSearchParams(queryString), [queryString]);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const { data, isPending, isFetching, isError, error, refetch } = useQuery(
    transactionsApi.list.toQuery(filters)
  );
  const resultsPending = isPending || isFetching;
  const resultsProps = {
    transactions: data?.data,
    totalCount: data?.pagination.totalCount,
    totalPages: data?.pagination.totalPages,
    rowCount: filters.pageSize,
    isPending: resultsPending,
    isError,
    error,
    onRetry: () => void refetch(),
  };

  return (
    <div className="w-full space-y-4" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">گزارش تراکنش‌ها</h1>
          <p className="text-muted-foreground text-sm">لیست و جزئیات تراکنش‌های سیستم</p>
        </div>
      </div>

      <TransactionFilters
        totalCount={data?.pagination.totalCount}
        visibleCount={data?.data.length}
      />

      {isDesktop === null ? (
        <TransactionResultsSkeleton rowCount={filters.pageSize} />
      ) : isDesktop ? (
        <TransactionDesktopResults {...resultsProps} />
      ) : (
        <TransactionMobileResults {...resultsProps} />
      )}
    </div>
  );
}
