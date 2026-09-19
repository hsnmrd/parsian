import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface TransactionMobileErrorProps {
  error?: Error | null;
  onRetry: () => void;
}

export function TransactionMobileError({ error, onRetry }: TransactionMobileErrorProps) {
  return (
    <Alert variant="destructive" className="pe-32">
      <AlertCircleIcon />
      <AlertTitle>خطا در دریافت اطلاعات تراکنش‌ها</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : "خطای غیرمنتظره در برقراری ارتباط با سرور"}
      </AlertDescription>
      <AlertAction className="top-1/2 -translate-y-1/2">
        <Button variant="outline" size="sm" className="min-h-11" onClick={onRetry}>
          <RotateCcwIcon data-icon="inline-start" />
          تلاش مجدد
        </Button>
      </AlertAction>
    </Alert>
  );
}
