import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import DiscountCountdown from "./DiscountCountdown";

export interface SaleData {
  label: string;
  endDate: Date;
}

export interface CategorieData {
  slug: string;
  name: string;
}

export interface ProductSectionProps {
  products: ProductCardProps[];
  sale?: SaleData;
  categorie: CategorieData;
  hrefLabel?: string;
}

export default function ProductSection({
  products,
  sale,
  categorie,
  hrefLabel = "View More",
}: ProductSectionProps) {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-red-600 rounded-full" />
              <h2 className="text-xl font-bold text-gray-800">
                {categorie.name}
              </h2>
            </div>
            {sale && (
              <span className="text-lg font-medium text-red-600">
                {sale.label}
              </span>
            )}
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <Link href={`/search?category=${categorie.slug}`}>
                {hrefLabel} <ChevronRight size={16} />
              </Link>
            </Button>
          </div>

          {sale && <DiscountCountdown discountEndDateTime={sale.endDate} />}

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.product.id}
                  className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 pl-4"
                >
                  <ProductCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
