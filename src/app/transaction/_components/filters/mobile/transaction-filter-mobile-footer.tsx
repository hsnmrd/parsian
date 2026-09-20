import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";

interface TransactionFilterMobileFooterProps {
  onClear: () => void;
  onApply: () => void;
}

export function TransactionFilterMobileFooter({
  onClear,
  onApply,
}: TransactionFilterMobileFooterProps) {
  return (
    <DrawerFooter className="grid grid-cols-2 gap-3 p-4">
      <Button type="button" variant="outline" className="h-11" onClick={onClear}>
        پاک کردن فیلترها
      </Button>
      <Button type="button" className="h-11" onClick={onApply}>
        اعمال فیلترها
      </Button>
    </DrawerFooter>
  );
}
