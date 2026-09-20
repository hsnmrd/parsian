import type { ReactNode } from "react";
import { TransactionFilters } from "./filters/transaction-filters";

interface TransactionsViewProps {
  children: ReactNode;
}

export function TransactionsView({ children }: TransactionsViewProps) {
  return (
    <div className="w-full space-y-4" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">گزارش تراکنش‌ها</h1>
          <p className="text-muted-foreground text-sm">لیست و جزئیات تراکنش‌های سیستم</p>
        </div>
      </div>

      <TransactionFilters />

      {children}
    </div>
  );
}
