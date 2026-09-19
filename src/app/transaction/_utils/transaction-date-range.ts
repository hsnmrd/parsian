import { format, isValid, parseISO } from "date-fns";
import type { DateRange } from "react-day-picker";

export function parseTransactionDateRange(from: string, to: string): DateRange | undefined {
  const parsedFrom = from ? parseISO(from) : undefined;
  const parsedTo = to ? parseISO(to) : undefined;
  const validFrom = parsedFrom && isValid(parsedFrom) ? parsedFrom : undefined;
  const validTo = parsedTo && isValid(parsedTo) ? parsedTo : undefined;

  if (!validFrom && !validTo) {
    return undefined;
  }

  return { from: validFrom ?? validTo, to: validTo };
}

export function serializeTransactionDate(date?: Date): string {
  return date ? format(date, "yyyy-MM-dd") : "";
}

const persianDateRangeFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatTransactionDateRange(from: string, to: string): string {
  const range = parseTransactionDateRange(from, to);

  if (range?.from && range.to) {
    return `${persianDateRangeFormatter.format(range.from)} تا ${persianDateRangeFormatter.format(range.to)}`;
  }

  if (range?.from) {
    return `از ${persianDateRangeFormatter.format(range.from)}`;
  }

  return "انتخاب بازه زمانی";
}
