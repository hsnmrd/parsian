"use client";

import { useState } from "react";
import { CalendarDaysIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  formatTransactionDateRange,
  serializeTransactionDate,
} from "../../../_utils/transaction-date-range";
import { TransactionDateRangeCalendar } from "./transaction-filter-date-range-calendar";

interface TransactionFilterDatePickerProps {
  value?: DateRange;
  onApply: (range: DateRange | undefined) => void;
  triggerClassName?: string;
  triggerLabel?: string;
}

export function TransactionFilterDatePicker({
  value,
  onApply,
  triggerClassName = "h-11 w-full justify-between",
  triggerLabel,
}: TransactionFilterDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(value);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const displayLabel =
    triggerLabel ??
    formatTransactionDateRange(
      serializeTransactionDate(value?.from),
      serializeTransactionDate(value?.to)
    );

  function handleOpenChange(open: boolean) {
    if (open) {
      setDraftRange(value);
    }
    setIsOpen(open);
  }

  function handleApply() {
    onApply(draftRange);
    setIsOpen(false);
  }

  const triggerContent = (
    <>
      <CalendarDaysIcon data-icon="inline-start" aria-hidden="true" />
      <span className="truncate">{displayLabel}</span>
    </>
  );

  if (isDesktop === false) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange} showSwipeHandle>
        <DrawerTrigger
          render={<Button type="button" variant="outline" className={triggerClassName} />}
        >
          {triggerContent}
        </DrawerTrigger>
        <DrawerContent className="rounded-t-2xl">
          <DrawerHeader className="border-b pb-4">
            <DrawerTitle>انتخاب بازه زمانی</DrawerTitle>
          </DrawerHeader>
          <div className="flex justify-center p-3">
            <TransactionDateRangeCalendar value={draftRange} onChange={setDraftRange} />
          </div>
          <DrawerFooter className="flex-row items-center justify-between gap-2 border-t pt-4">
            <Button
              type="button"
              variant="ghost"
              className="min-h-[44px] flex-1"
              onClick={() => setDraftRange(undefined)}
            >
              پاک کردن
            </Button>
            <Button type="button" className="min-h-[44px] flex-1" onClick={handleApply}>
              اعمال بازه
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={<Button type="button" variant="outline" className={triggerClassName} />}
      >
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto gap-3 p-3">
        <TransactionDateRangeCalendar value={draftRange} onChange={setDraftRange} />
        <div className="flex items-center justify-between gap-2">
          <Button type="button" variant="ghost" onClick={() => setDraftRange(undefined)}>
            پاک کردن
          </Button>
          <Button type="button" onClick={handleApply}>
            اعمال بازه
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
