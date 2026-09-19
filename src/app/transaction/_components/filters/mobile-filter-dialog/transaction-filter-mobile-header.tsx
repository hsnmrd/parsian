import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export function TransactionFilterMobileHeader() {
  return (
    <DrawerHeader className="min-h-14 justify-center px-14 py-3 text-center">
      <DrawerClose
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
      </DrawerClose>
      <DrawerTitle>فیلترها</DrawerTitle>
    </DrawerHeader>
  );
}
