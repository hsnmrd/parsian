import { TransactionErrorState } from "../shared/transaction-error-state";

interface TransactionMobileErrorProps {
  error?: Error | null;
  onRetry: () => void;
}

export function TransactionMobileError({ error, onRetry }: TransactionMobileErrorProps) {
  return <TransactionErrorState error={error} onRetry={onRetry} />;
}
