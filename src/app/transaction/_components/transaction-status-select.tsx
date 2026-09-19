import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TRANSACTION_STATUS_FILTERS,
  type TransactionStatusFilter,
} from "../_utils/transaction-filter-options";

interface TransactionStatusSelectProps {
  ariaLabel: string;
  value: TransactionStatusFilter;
  onChange: (value: TransactionStatusFilter | null) => void;
}

export function TransactionStatusSelect({
  ariaLabel,
  value,
  onChange,
}: TransactionStatusSelectProps) {
  return (
    <Select items={TRANSACTION_STATUS_FILTERS} value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={ariaLabel}
        className="w-full data-[size=default]:h-12 lg:data-[size=default]:h-11"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        <SelectGroup>
          {TRANSACTION_STATUS_FILTERS.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
