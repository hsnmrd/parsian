import { Field, FieldLabel } from "@/components/ui/field";
import type { TransactionStatusFilter } from "../../../_utils/transaction-filter-options";
import { TransactionStatusSelect } from "../transaction-filter-status-select";

interface TransactionFilterMobileStatusFieldProps {
  value: TransactionStatusFilter;
  onChange: (value: TransactionStatusFilter) => void;
}

export function TransactionFilterMobileStatusField({
  value,
  onChange,
}: TransactionFilterMobileStatusFieldProps) {
  return (
    <Field className="gap-2">
      <FieldLabel>وضعیت</FieldLabel>
      <TransactionStatusSelect
        ariaLabel="وضعیت تراکنش در پنجره فیلترها"
        value={value}
        onChange={(newValue) => onChange(newValue ?? "ALL")}
      />
    </Field>
  );
}
