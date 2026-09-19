import type { DateRange } from "react-day-picker";
import { Field, FieldLabel } from "@/components/ui/field";
import { TransactionFilterDatePicker } from "../shared/transaction-filter-date-picker";

interface TransactionFilterMobileDateFieldProps {
  range?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export function TransactionFilterMobileDateField({
  range,
  onChange,
}: TransactionFilterMobileDateFieldProps) {
  return (
    <Field className="gap-2">
      <FieldLabel>بازه زمانی</FieldLabel>
      <TransactionFilterDatePicker
        value={range}
        onApply={onChange}
        triggerClassName="h-12 w-full justify-between"
      />
    </Field>
  );
}
