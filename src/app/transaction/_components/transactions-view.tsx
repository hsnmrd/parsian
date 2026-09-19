"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { transactionsApi } from "../_api/transactions-api";
import { transactionSearchParamsParsers } from "../_params/transaction-search-params";
import { TransactionResultsSkeleton } from "./transaction-results-skeleton";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const TransactionDesktopResults = dynamic(
  () => import("./transaction-desktop-results").then((module) => module.TransactionDesktopResults),
  {
    ssr: false,
    loading: () => <TransactionResultsSkeleton />,
  }
);

const TransactionMobileResults = dynamic(
  () => import("./transaction-mobile-results").then((module) => module.TransactionMobileResults),
  {
    ssr: false,
    loading: () => <TransactionResultsSkeleton />,
  }
);

export function TransactionsView() {
  const [filters] = useQueryStates(transactionSearchParamsParsers);
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
        {isDesktop && data && (
          <div className="text-muted-foreground text-xs">
            تعداد کل:{" "}
            <span className="text-foreground font-semibold">
              {data.pagination.totalCount.toLocaleString("fa-IR")}
            </span>{" "}
            تراکنش
          </div>
        )}
      </div>

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
