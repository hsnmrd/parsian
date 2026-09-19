import type { Transaction } from "../_types/transaction";
import { TransactionMobileCard } from "./transaction-mobile-card";
import { TransactionMobileEmpty } from "./transaction-mobile-empty";
import { TransactionMobileError } from "./transaction-mobile-error";
import { TransactionPagination } from "./transaction-pagination";
import { TransactionResultsSkeleton } from "./transaction-results-skeleton";

interface TransactionMobileResultsProps {
  transactions?: Transaction[];
  totalCount?: number;
  totalPages?: number;
  rowCount: number;
  isPending: boolean;
  isError: boolean;
  error?: Error | null;
  onRetry: () => void;
}

export function TransactionMobileResults({
  transactions,
  totalCount = 0,
  totalPages = 0,
  rowCount,
  isPending,
  isError,
  error,
  onRetry,
}: TransactionMobileResultsProps) {
  if (isPending) {
    return <TransactionResultsSkeleton rowCount={rowCount} />;
  }

  if (isError) {
    return <TransactionMobileError error={error} onRetry={onRetry} />;
  }

  if (!transactions || transactions.length === 0) {
    return <TransactionMobileEmpty />;
  }

  return (
    <section aria-labelledby="mobile-transactions-title" className="flex flex-col gap-3">
      <h2 id="mobile-transactions-title" className="sr-only">
        فهرست تراکنش‌ها
      </h2>

      <div className="text-muted-foreground flex items-center justify-between gap-4 text-xs">
        <p>
          نمایش {transactions.length} تراکنش از{" "}
          <span className="text-foreground font-semibold">{totalCount}</span> کل
        </p>
        <span className="flex shrink-0 items-center gap-2">
          <span aria-hidden="true" className="bg-primary size-2 rounded-full" />
          به‌روز
        </span>
      </div>

      <div role="list" className="flex flex-col gap-3">
        {transactions.map((transaction) => (
          <TransactionMobileCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {totalPages > 1 && <TransactionPagination totalPages={totalPages} variant="mobile" />}
    </section>
  );
}
