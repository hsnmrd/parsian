import { Skeleton } from "@/components/ui/skeleton";

export function TransactionFilterDateRangeCalendarSkeleton() {
  return (
    <div
      data-slot="calendar-skeleton"
      aria-hidden="true"
      className="mx-auto flex h-[312px] w-[268px] flex-col gap-4 p-3"
    >
      <div className="flex h-8 items-center justify-between px-1">
        <Skeleton className="size-7 rounded-md" />
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="size-7 rounded-md" />
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={`header-${index}`} className="h-4 w-full rounded-sm" />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, index) => (
          <Skeleton key={`cell-${index}`} className="aspect-square w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
