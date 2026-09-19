import { TableCell, TableRow } from "@/components/ui/table";
import { TransactionErrorState } from "../shared/transaction-error-state";

interface TransactionDesktopErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function TransactionDesktopError({ error, onRetry }: TransactionDesktopErrorProps) {
  return (
    <TableRow>
      <TableCell colSpan={6} className="h-44 p-6">
        <div className="mx-auto max-w-xl">
          <TransactionErrorState error={error} onRetry={onRetry} />
        </div>
      </TableCell>
    </TableRow>
  );
}
