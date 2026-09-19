import { TableCell, TableRow } from "@/components/ui/table";
import { TransactionEmptyState } from "../shared/transaction-empty-state";

interface TransactionDesktopEmptyProps {
  message?: string;
}

export function TransactionDesktopEmpty({ message }: TransactionDesktopEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={6} className="h-44 text-center">
        <TransactionEmptyState message={message} className="p-4" />
      </TableCell>
    </TableRow>
  );
}
