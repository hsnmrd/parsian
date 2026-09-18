import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { TableCell, TableRow } from "@/components/ui/table";
import { SearchXIcon } from "lucide-react";

interface TransactionTableEmptyProps {
  message?: string;
}

export function TransactionTableEmpty({
  message = "تراکنشی برای نمایش یافت نشد.",
}: TransactionTableEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={6} className="h-44 text-center">
        <Empty className="p-4">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon className="size-5" />
            </EmptyMedia>
            <EmptyTitle className="text-sm font-medium">{message}</EmptyTitle>
            <EmptyDescription className="text-xs">
              فیلترها یا عبارت جستجو را تغییر داده و مجدداً امتحان کنید.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
}
