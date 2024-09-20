import { cn, formatPrice } from "@/lib/utils";

export interface PriceProps {
  priceInCents: number;
  variant?: "default" | "crossed" | "sale";
  className?: string;
}

export default function Price({
  priceInCents,
  variant = "default",
  className,
}: PriceProps) {
  const formattedPrice = formatPrice(priceInCents);

  return (
    <span
      className={cn(
        "inline-block font-medium",
        {
          "text-sm text-foreground": variant === "default",
          "text-sm line-through text-muted-foreground": variant === "crossed",
          "text-base font-semibold text-red-600": variant === "sale",
        },
        className
      )}
      aria-label={`Price: ${formattedPrice}`}
    >
      {formattedPrice}
    </span>
  );
}
