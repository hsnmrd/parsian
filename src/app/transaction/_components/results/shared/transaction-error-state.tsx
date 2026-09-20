import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getUserFacingErrorMessage } from "@/lib/error-messages";
import { cn } from "@/lib/utils";

interface TransactionErrorStateProps {
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

export function TransactionErrorState({ error, onRetry, className }: TransactionErrorStateProps) {
  return (
    <Alert variant="destructive" className={cn("pe-32", className)}>
      <AlertCircleIcon />
      <AlertTitle className="font-semibold">خطا در دریافت اطلاعات تراکنش‌ها</AlertTitle>
      <AlertDescription className="text-xs sm:text-sm">
        {getUserFacingErrorMessage(error)}
      </AlertDescription>
      {onRetry && (
        <AlertAction className="end-3 top-1/2 -translate-y-1/2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="text-foreground bg-background hover:bg-muted min-h-11 gap-1.5 text-xs sm:min-h-9"
          >
            <RotateCcwIcon className="size-3.5" data-icon="inline-start" />
            تلاش مجدد
          </Button>
        </AlertAction>
      )}
    </Alert>
  );
}
