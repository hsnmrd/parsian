import { Skeleton } from "@/components/ui/skeleton";

interface TransactionResultsSkeletonProps {
  rowCount?: number;
}

export function TransactionResultsSkeleton({ rowCount = 4 }: TransactionResultsSkeletonProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className="md:bg-card flex flex-col gap-3 md:gap-0 md:overflow-hidden md:rounded-xl md:border md:shadow-xs"
    >
      <span className="sr-only">در حال دریافت تراکنش‌ها</span>

      <div className="bg-card flex min-h-16 items-center justify-between rounded-lg border px-4 md:min-h-19 md:rounded-none md:border-x-0 md:border-t-0 md:px-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {Array.from({ length: Math.min(rowCount, 4) }).map((_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="bg-card grid min-h-36 grid-cols-2 items-center gap-x-4 gap-y-3 rounded-lg border p-4 md:min-h-14 md:grid-cols-[10%_19%_24%_19%_14%_14%] md:gap-0 md:rounded-none md:border-x-0 md:border-t-0 md:px-5 md:py-0"
        >
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </section>
  );
}
