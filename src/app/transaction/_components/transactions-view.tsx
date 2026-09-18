"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { transactionsApi } from "../_api/transactions-api";
import { transactionSearchParamsParsers } from "../_params/transaction-search-params";
import { formatCardNumber, formatAmount, formatDateTime } from "@/lib/formatters";
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

      <div
        className={cn(
          "bg-card rounded-lg border shadow-xs transition-opacity duration-200",
          isFetching && !isPending && "opacity-60"
        )}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-start font-bold">شناسه</TableHead>
              <TableHead className="text-start font-bold">نام مشتری</TableHead>
              <TableHead className="text-start font-bold">شماره کارت</TableHead>
              <TableHead className="text-start font-bold">مبلغ</TableHead>
              <TableHead className="text-start font-bold">وضعیت</TableHead>
              <TableHead className="text-start font-bold">تاریخ و زمان</TableHead>
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
                  <TableRow key={transaction.id} className="transition-colors">
                    <TableCell className="text-xs font-medium">#{transaction.id}</TableCell>
                    <TableCell className="font-medium">{transaction.customerName}</TableCell>
                    <TableCell className="text-xs tracking-wider" dir="ltr">
                      {formatCardNumber(transaction.cardNumber)}
                    </TableCell>
                    <TableCell className="text-foreground font-medium">
                      {formatAmount(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {formatDateTime(transaction.transactionDate)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {data && data.pagination.totalCount > 0 && (
        <TransactionPagination
          totalPages={data.pagination.totalPages}
          totalCount={data.pagination.totalCount}
        />
      )}
    </div>
  );
}
