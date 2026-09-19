"use client";

import { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "cn";
import {
  TRANSACTION_STATUS_FILTERS,
  type TransactionStatusFilter,
} from "../../_utils/transaction-filter-options";

interface TransactionStatusSelectProps {
  ariaLabel: string;
  value: TransactionStatusFilter;
  onChange: (value: TransactionStatusFilter | null) => void;
  className?: string;
}

export function TransactionStatusSelect({
  ariaLabel,
  value,
  onChange,
  className,
}: TransactionStatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const selectedOption =
    TRANSACTION_STATUS_FILTERS.find((status) => status.value === value) ??
    TRANSACTION_STATUS_FILTERS[0];

  if (isDesktop === false) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen} showSwipeHandle>
        <DrawerTrigger
          render={
            <Button
              type="button"
              variant="outline"
              aria-label={ariaLabel}
              className={cn("h-12 w-full justify-between px-3 font-normal", className)}
            />
          }
        >
          <span className="truncate">{selectedOption.label}</span>
          <ChevronDownIcon
            className="text-muted-foreground size-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </DrawerTrigger>
        <DrawerContent className="rounded-t-2xl">
          <DrawerHeader className="border-b pb-4">
            <DrawerTitle>وضعیت تراکنش</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-1 p-3">
            {TRANSACTION_STATUS_FILTERS.map((status) => {
              const isSelected = status.value === value;
              return (
                <button
                  key={status.value}
                  type="button"
                  className={cn(
                    "flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm transition-colors",
                    isSelected
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-foreground hover:bg-muted active:bg-muted/80 font-normal"
                  )}
                  onClick={() => {
                    onChange(status.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{status.label}</span>
                  {isSelected && <CheckIcon className="text-primary size-4" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Select items={TRANSACTION_STATUS_FILTERS} value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn("w-full data-[size=default]:h-12 lg:data-[size=default]:h-11", className)}
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
