import { CalendarDaysIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  formatTransactionDateRange,
  serializeTransactionDate,
} from "../../../_utils/transaction-date-range";
import { TransactionDateRangeCalendar } from "../transaction-filter-date-range-calendar";

interface TransactionFilterMobileDateFieldProps {
  range?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export function TransactionFilterMobileDateField({
  range,
  onChange,
}: TransactionFilterMobileDateFieldProps) {
  const label = formatTransactionDateRange(
    serializeTransactionDate(range?.from),
    serializeTransactionDate(range?.to)
  );

  return (
    <Field className="gap-2">
      <FieldLabel>بازه زمانی</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button type="button" variant="outline" className="h-12 w-full justify-between" />
          }
        >
          <CalendarDaysIcon data-icon="inline-start" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-3">
          <TransactionDateRangeCalendar value={range} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
