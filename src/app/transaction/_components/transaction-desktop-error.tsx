import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";

interface TransactionDesktopErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function TransactionDesktopError({ error, onRetry }: TransactionDesktopErrorProps) {
  return (
    <TableRow>
      <TableCell colSpan={6} className="h-44 p-6">
        <div className="mx-auto max-w-xl">
          <Alert variant="destructive" className="pe-28">
            <AlertCircleIcon />
            <AlertTitle className="font-semibold">خطا در دریافت اطلاعات تراکنش‌ها</AlertTitle>
            <AlertDescription className="text-xs">
              {error instanceof Error ? error.message : "خطای غیرمنتظره در برقراری ارتباط با سرور"}
            </AlertDescription>
            {onRetry && (
              <AlertAction className="end-3 top-1/2 -translate-y-1/2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="text-foreground bg-background hover:bg-muted gap-1.5 text-xs"
                >
                  <RotateCcwIcon className="size-3.5" />
                  تلاش مجدد
                </Button>
              </AlertAction>
            )}
          </Alert>
        </div>
      </TableCell>
    </TableRow>
  );
}
