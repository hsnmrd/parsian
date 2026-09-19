import { FieldGroup } from "@/components/ui/field";
import { TransactionFilterDesktopClearButton } from "./desktop/transaction-filter-desktop-clear-button";
import { TransactionFilterDesktopDateField } from "./desktop/transaction-filter-desktop-date-field";
import { TransactionFilterMobileDialog } from "./mobile/transaction-filter-mobile-dialog";
import { TransactionSearchFilter } from "./shared/transaction-filter-search";
import { TransactionStatusFilter } from "./shared/transaction-filter-status";
import { TransactionFilterSummary } from "./shared/transaction-filter-summary";

interface TransactionFiltersProps {
  totalCount?: number;
  visibleCount?: number;
}

export function TransactionFilters({ totalCount, visibleCount }: TransactionFiltersProps) {
  return (
    <section
      aria-label="فیلتر تراکنش‌ها"
      className="lg:bg-card lg:rounded-xl lg:border lg:shadow-xs"
    >
      <FieldGroup className="gap-3 lg:grid lg:grid-cols-[minmax(16rem,1fr)_12rem_14rem_9.5rem] lg:items-end lg:gap-4 lg:p-5">
        <TransactionSearchFilter />

        <div className="grid grid-cols-[minmax(0,1fr)_3rem] gap-2 lg:contents">
          <TransactionStatusFilter />
          <TransactionFilterDesktopDateField />
          <TransactionFilterDesktopClearButton />
          <TransactionFilterMobileDialog />
        </div>
      </FieldGroup>

      <TransactionFilterSummary totalCount={totalCount} visibleCount={visibleCount} />
    </section>
  );
}
