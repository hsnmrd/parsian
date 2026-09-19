import { DatabaseIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCardNumber, formatDateTime } from "@/lib/formatters";
import type { Transaction } from "../_types/transaction";
import { STATUS_CONFIG } from "../_utils/status-config";
import { TransactionDesktopEmpty } from "./transaction-desktop-empty";
import { TransactionDesktopError } from "./transaction-desktop-error";
import { TransactionPagination } from "./transaction-pagination";
import { TransactionResultsSkeleton } from "./transaction-results-skeleton";

interface TransactionDesktopResultsProps {
  transactions?: Transaction[];
  totalCount?: number;
  totalPages?: number;
  rowCount: number;
  isPending: boolean;
  isError: boolean;
  error?: Error | null;
  onRetry: () => void;
}

export function TransactionDesktopResults({
  transactions,
  totalCount = 0,
  totalPages = 0,
  rowCount,
  isPending,
  isError,
  error,
  onRetry,
}: TransactionDesktopResultsProps) {
  if (isPending) {
    return <TransactionResultsSkeleton rowCount={rowCount} />;
  }

  return (
    <section
      aria-labelledby="transactions-table-title"
      className="bg-card overflow-hidden rounded-xl border shadow-xs"
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
            <TableHead className="h-11 px-5 text-start text-xs font-semibold">نام مشتری</TableHead>
            <TableHead className="h-11 px-5 text-start text-xs font-semibold">شماره کارت</TableHead>
            <TableHead className="h-11 px-5 text-start text-xs font-semibold">مبلغ</TableHead>
            <TableHead className="h-11 px-5 text-start text-xs font-semibold">وضعیت</TableHead>
            <TableHead className="h-11 px-5 text-start text-xs font-semibold">
              تاریخ و ساعت
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError ? (
            <TransactionDesktopError error={error} onRetry={onRetry} />
          ) : !transactions || transactions.length === 0 ? (
            <TransactionDesktopEmpty />
          ) : (
            transactions.map((transaction) => {
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

      {totalCount > 0 && <TransactionPagination totalPages={totalPages} variant="desktop" />}
    </section>
  );
}
