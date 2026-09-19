import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

const MOBILE_FILTER_FIELD_COUNT = 2;

export function TransactionFilterMobileTrigger() {
  return (
    <DialogTrigger
      render={
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="relative size-12 lg:hidden"
          aria-label="باز کردن فیلترها"
        />
      }
    >
      <FilterIcon aria-hidden="true" />
      <span
        aria-hidden="true"
        className="bg-primary text-primary-foreground absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] tabular-nums"
      >
        {MOBILE_FILTER_FIELD_COUNT.toLocaleString("fa-IR")}
      </span>
    </DialogTrigger>
  );
}
