import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface TransactionFilterMobileFooterProps {
  onClear: () => void;
  onApply: () => void;
}

export function TransactionFilterMobileFooter({
  onClear,
  onApply,
}: TransactionFilterMobileFooterProps) {
  return (
    <DialogFooter className="grid grid-cols-2 p-4">
      <Button type="button" variant="outline" className="h-11" onClick={onClear}>
        پاک کردن فیلترها
      </Button>
      <Button type="button" className="h-11" onClick={onApply}>
        اعمال فیلترها
      </Button>
    </DialogFooter>
  );
}
