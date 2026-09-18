import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";
import type { TransactionStatus } from "../_types/transaction";

export const STATUS_CONFIG: Record<
  TransactionStatus,
  {
    label: string;
    variant: NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
  }
> = {
  Successful: {
    label: "موفق",
    variant: "success",
  },
  Failed: {
    label: "ناموفق",
    variant: "destructive",
  },
  Pending: {
    label: "در انتظار",
    variant: "warning",
  },
};
