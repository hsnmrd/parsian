import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function TransactionFilterMobileHeader() {
  return (
    <DialogHeader className="min-h-14 justify-center px-14 py-3 text-center">
      <DialogClose
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute start-3 top-3"
            aria-label="بستن فیلترها"
          />
        }
      >
        <XIcon aria-hidden="true" />
      </DialogClose>
      <DialogTitle>فیلترها</DialogTitle>
    </DialogHeader>
  );
}
