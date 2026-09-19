import { faIR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface TransactionDateRangeCalendarProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export function TransactionDateRangeCalendar({
  value,
  onChange,
}: TransactionDateRangeCalendarProps) {
  return (
    <Calendar
      mode="range"
      locale={faIR}
      selected={value}
      onSelect={onChange}
      defaultMonth={value?.from}
      numberOfMonths={1}
      disabled={{ after: new Date() }}
      className="mx-auto"
    />
  );
}
