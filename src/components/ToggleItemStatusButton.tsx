"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromCart,
  removeProductFromWishlist,
} from "@/lib/actions";

export interface ToggleItemStatusButtonProps {
  active?: boolean;
  type: "cart" | "wishlist";
  id: string;
  name: string;
}

export default function ToggleItemStatusButton({
  active = false,
  type,
  id,
  name,
}: ToggleItemStatusButtonProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(active);

  const action = useMemo(
    () =>
      type === "cart"
        ? (isActive: boolean) =>
            isActive ? addProductToCart(id) : removeProductFromCart(id)
        : (isActive: boolean) =>
            isActive ? addProductToWishlist(id) : removeProductFromWishlist(id),
    [type, id]
  );

  const Icon = type === "cart" ? ShoppingCart : Heart;

  const handleClick = useCallback(() => {
    if (isPending) return;

    startTransition(() => {
      action(!isActive);
      setIsActive((prev) => !prev);
      toast({
        variant: "default",
        title: isActive ? `Removed from ${type}` : `Added to ${type}`,
        description: `${name} has been ${
          isActive ? "removed from" : "added to"
        } your ${type}.`,
      });
    });
  }, [isPending, action, isActive, type, name, toast]);

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={`${isActive ? "Remove from" : "Add to"} ${type}`}
      className={cn(
        "transition-all duration-200 ease-in-out relative w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center group overflow-hidden",
        isPending && "opacity-50 cursor-not-allowed"
      )}
    >
      <Icon
        size={20}
        className={cn(
          "transition-all duration-200",
          isActive
            ? "text-red-500 scale-110"
            : "text-gray-500 group-hover:scale-110"
        )}
        fill={isActive ? "currentColor" : "none"}
      />
    </button>
  );
}
