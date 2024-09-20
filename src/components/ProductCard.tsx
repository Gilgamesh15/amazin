import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import DiscountTag from "./DiscountTag";
import Rating from "./Rating";
import ToggleItemStatusButton from "./ToggleItemStatusButton";
import Price from "./Price";
import { calculateFinalPrice } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  slug: string;
  priceInCents: number;
  discountType?: "fixed" | "percentage";
  discountValue?: number;
  rating: number;
  ratingCount: number;
  image: string;
}

export interface ProductCardProps {
  product: Product;
  wishlisted: boolean;
  inCart: boolean;
}

export default function ProductCard({
  product,
  wishlisted,
  inCart,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="relative group aspect-square w-full overflow-hidden rounded-md">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {product.discountType && product.discountValue && (
            <div className="absolute top-2 left-2 z-10">
              <DiscountTag
                type={product.discountType}
                value={product.discountValue}
              />
            </div>
          )}

          <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ToggleItemStatusButton
              active={wishlisted}
              type="wishlist"
              id={product.id}
              name={product.name}
            />
            <ToggleItemStatusButton
              active={inCart}
              type="cart"
              id={product.id}
              name={product.name}
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium line-clamp-2 h-10 flex items-center">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Price
                priceInCents={
                  product.discountType && product.discountValue
                    ? calculateFinalPrice(
                        product.priceInCents,
                        product.discountType,
                        product.discountValue
                      )
                    : product.priceInCents
                }
                variant="default"
              />
              {product.discountType && product.discountValue && (
                <Price priceInCents={product.priceInCents} variant="crossed" />
              )}
            </div>
            <Rating rating={product.rating} count={product.ratingCount} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
