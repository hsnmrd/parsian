import { SearchXIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface TransactionEmptyStateProps {
  message?: string;
  className?: string;
}

export function TransactionEmptyState({
  message = "تراکنشی برای نمایش یافت نشد.",
  className,
}: TransactionEmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon className="size-5" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle className="text-sm font-medium">{message}</EmptyTitle>
        <EmptyDescription className="text-xs">
          فیلترها یا عبارت جستجو را تغییر داده و مجدداً امتحان کنید.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
