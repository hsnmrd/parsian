"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { transactionsApi } from "../_api/transactions-api";
import { transactionSearchParamsParsers } from "../_params/transaction-search-params";
import { formatCardNumber, formatDateTime } from "@/lib/formatters";
import { STATUS_CONFIG } from "../_utils/status-config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";
import { TransactionTableSkeleton } from "./transaction-table-skeleton";
import { TransactionTableError } from "./transaction-table-error";
import { TransactionTableEmpty } from "./transaction-table-empty";
import { TransactionPagination } from "./transaction-pagination";
import type { Transaction } from "../_types/transaction";
import { DatabaseIcon } from "lucide-react";

export function TransactionsView() {
  const [filters] = useQueryStates(transactionSearchParamsParsers);

  const { data, isPending, isFetching, isError, error, refetch } = useQuery({
    ...transactionsApi.list.toQuery(filters),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="w-full space-y-4" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">گزارش تراکنش‌ها</h1>
          <p className="text-muted-foreground text-sm">لیست و جزئیات تراکنش‌های سیستم</p>
        </div>
        {data && (
          <div className="text-muted-foreground text-xs">
            تعداد کل:{" "}
            <span className="text-foreground font-semibold">
              {data.pagination.totalCount.toLocaleString("fa-IR")}
            </span>{" "}
            تراکنش
          </div>
        )}
      </div>

      <section
        aria-labelledby="transactions-table-title"
        className={cn(
          "bg-card overflow-hidden rounded-xl border shadow-xs transition-opacity duration-200",
          isFetching && !isPending && "opacity-60"
        )}
      >
        <div className="flex min-h-19 items-center justify-between gap-6 border-b px-5 py-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <h2 id="transactions-table-title" className="text-base font-bold">
              فهرست تراکنش‌ها
            </h2>
            <p className="text-muted-foreground text-xs">مرتب‌سازی بر اساس جدیدترین تراکنش</p>
          </div>
          <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-xs">
            <DatabaseIcon aria-hidden="true" className="size-4" />
            <span>داده‌های عملیاتی</span>
          </div>
        </div>

        <Table>
          <colgroup>
            <col className="w-[10%]" />
            <col className="w-[19%]" />
            <col className="w-[24%]" />
            <col className="w-[19%]" />
            <col className="w-[14%]" />
            <col className="w-[14%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-muted/25 hover:bg-muted/25">
              <TableHead className="h-11 px-5 text-start text-xs font-semibold">شناسه</TableHead>
              <TableHead className="h-11 px-5 text-start text-xs font-semibold">
                نام مشتری
              </TableHead>
              <TableHead className="h-11 px-5 text-start text-xs font-semibold">
                شماره کارت
              </TableHead>
              <TableHead className="h-11 px-5 text-start text-xs font-semibold">مبلغ</TableHead>
              <TableHead className="h-11 px-5 text-start text-xs font-semibold">وضعیت</TableHead>
              <TableHead className="h-11 px-5 text-start text-xs font-semibold">
                تاریخ و ساعت
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TransactionTableSkeleton rowCount={filters.pageSize} />
            ) : isError ? (
              <TransactionTableError error={error} onRetry={() => refetch()} />
            ) : !data || data.data.length === 0 ? (
              <TransactionTableEmpty />
            ) : (
              data.data.map((transaction: Transaction) => {
                const status = STATUS_CONFIG[transaction.status] ?? {
                  label: transaction.status,
                  variant: "secondary" as const,
                };
                return (
                  <TableRow key={transaction.id} className="h-14 transition-colors">
                    <TableCell className="text-muted-foreground px-5 text-xs tabular-nums">
                      {transaction.id.toLocaleString("fa-IR", { useGrouping: false })}
                    </TableCell>
                    <TableCell className="px-5 font-semibold">{transaction.customerName}</TableCell>
                    <TableCell
                      className="text-muted-foreground px-5 text-sm tracking-wide tabular-nums"
                      dir="rtl"
                    >
                      {formatCardNumber(transaction.cardNumber)}
                    </TableCell>
                    <TableCell className="px-5">
                      <span className="flex items-baseline gap-1" dir="rtl">
                        <span className="font-semibold tabular-nums">
                          {transaction.amount.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-muted-foreground text-[11px]">تومان</span>
                      </span>
                    </TableCell>
                    <TableCell className="px-5">
                      <Badge variant={status.variant} className="gap-1.5 border-0 px-2.5">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground px-5 text-xs tabular-nums">
                      {formatDateTime(transaction.transactionDate)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {data && data.pagination.totalCount > 0 && (
          <TransactionPagination totalPages={data.pagination.totalPages} />
        )}
      </section>
    </div>
  );
}
