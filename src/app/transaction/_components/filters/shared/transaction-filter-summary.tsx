interface TransactionFilterSummaryProps {
  totalCount?: number;
  visibleCount?: number;
}

export function TransactionFilterSummary({
  totalCount,
  visibleCount,
}: TransactionFilterSummaryProps) {
  return (
    <div className="text-muted-foreground hidden min-h-14 items-center justify-between gap-4 border-t px-5 text-xs lg:flex">
      <p>
        نمایش {visibleCount?.toLocaleString("fa-IR") ?? "—"} تراکنش از{" "}
        {totalCount?.toLocaleString("fa-IR") ?? "—"} کل
      </p>
      <span className="flex items-center gap-2">
        <span aria-hidden="true" className="bg-primary size-2 rounded-full" />
        نتایج بر اساس آخرین درخواست شما
      </span>
    </div>
  );
}
