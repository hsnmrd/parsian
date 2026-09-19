import { SearchXIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function TransactionMobileEmpty() {
  return (
    <Empty className="min-h-64">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>تراکنشی برای نمایش یافت نشد.</EmptyTitle>
        <EmptyDescription>
          فیلترها یا عبارت جستجو را تغییر داده و مجدداً امتحان کنید.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
