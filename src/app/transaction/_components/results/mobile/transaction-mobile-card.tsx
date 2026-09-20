import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCardNumber, formatDateTime } from "@/lib/formatters";
import type { Transaction } from "../../../_types/transaction";
import { STATUS_CONFIG } from "../../../_utils/status-config";

interface TransactionMobileCardProps {
  transaction: Transaction;
}

export function TransactionMobileCard({ transaction }: TransactionMobileCardProps) {
  const status = STATUS_CONFIG[transaction.status] ?? {
    label: transaction.status,
    variant: "secondary" as const,
  };
  const titleId = `transaction-${transaction.id}-customer`;

  return (
    <Card role="listitem" aria-labelledby={titleId} size="sm" className="gap-0 rounded-lg py-0">
      <CardHeader className="grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 pt-4 pb-3">
        <CardTitle id={titleId} className="text-base font-bold">
          {transaction.customerName}
        </CardTitle>
        <CardDescription className="text-start text-xs tabular-nums">
          <bdi dir="ltr">{formatCardNumber(transaction.cardNumber)}</bdi>
        </CardDescription>
        <CardAction>
          <Badge variant={status.variant} className="gap-1.5 border-0 px-2.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            {status.label}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="gap-3 pb-4">
        <div className="flex items-baseline gap-1" dir="rtl">
          <span className="text-xl font-bold tabular-nums">
            {transaction.amount.toLocaleString("fa-IR")}
          </span>
          <span className="text-muted-foreground text-xs">تومان</span>
        </div>
        <Separator />
      </CardContent>

      <CardFooter className="text-muted-foreground justify-between gap-4 pb-4 text-[11px]">
        <time dateTime={transaction.transactionDate} className="tabular-nums">
          {formatDateTime(transaction.transactionDate)}
        </time>
        <span className="tabular-nums">
          #{transaction.id.toLocaleString("fa-IR", { useGrouping: false })}
        </span>
      </CardFooter>
    </Card>
  );
}
