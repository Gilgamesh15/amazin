import { formatPercentage, formatPrice } from "@/lib/utils";
import { Percent, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export interface DiscountTagProps {
  type: "fixed" | "percentage";
  value: number;
}

export default function DiscountTag({
  type = "percentage",
  value,
}: DiscountTagProps) {
  const formattedDiscount =
    type === "percentage" ? formatPercentage(value) : formatPrice(value);

  const Icon = type === "percentage" ? Percent : DollarSign;

  return (
    <Badge
      variant="destructive"
      className="relative z-10 flex items-center gap-1 px-2 py-1 text-sm font-medium tracking-tight bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 rounded-full shadow-md"
    >
      <Icon size={14} className="mr-1" />-{formattedDiscount}
    </Badge>
  );
}
