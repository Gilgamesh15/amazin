"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";

import { ProductCard } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { getProducts, getProductsCount } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

// Ensure dynamic rendering
export const dynamic = "force-dynamic";

// Define types for better type safety
type Range = {
  min: number;
  max: number;
};

type FilterConfig = {
  categories: string[];
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  maxRating: number | null;
  minRatingCount: number | null;
  maxRatingCount: number | null;
};

export default function SearchPage() {
  const [products, setProducts] = useState<
    Prisma.PromiseReturnType<typeof getProducts>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [displayAmount] = useState<number>(10); // Removed setDisplayAmount as it's not used

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return `/search?${params.toString()}`;
    },
    [searchParams]
  );

  const config: FilterConfig = useMemo(
    () => ({
      categories: searchParams.getAll("category"),
      name: searchParams.get("name"),
      minPrice: Number(searchParams.get("min-price")) || null,
      maxPrice: Number(searchParams.get("max-price")) || null,
      minRating: Number(searchParams.get("min-rating")) || null,
      maxRating: Number(searchParams.get("max-rating")) || null,
      minRatingCount: Number(searchParams.get("min-rating-count")) || null,
      maxRatingCount: Number(searchParams.get("max-rating-count")) || null,
    }),
    [searchParams]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);

      try {
        const [products, totalProducts] = await Promise.all([
          getProducts({ ...config, page }),
          getProductsCount(config),
        ]);

        setProducts(products);
        setTotalPages(Math.ceil(totalProducts / displayAmount));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [config, page, displayAmount]);

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <FiltersBar config={config} />
        <main className="flex-grow">
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <>
              <ProductGrid products={products} />
              <PaginationControls
                page={page}
                totalPages={totalPages}
                createQueryString={createQueryString}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.images[0]}
          id={product.id}
          name={product.name}
          rating={{
            rating: product.rating,
            count: product.ratingCount,
          }}
          priceInCents={product.priceInCents}
          discount={
            product.discount?.value &&
            product.discount.type &&
            product.finalPriceInCents
              ? {
                  value: product.discount.value,
                  variant:
                    product.discount.type === "FIXED" ? "fixed" : "percentage",
                  finalPriceInCents: product.finalPriceInCents,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function PaginationControls({ page, totalPages, createQueryString }) {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={createQueryString("page", `${page - 1}`)}
            />
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink href={createQueryString("page", "1")}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page - 1 > 0 && (
          <PaginationItem>
            <PaginationLink href={createQueryString("page", `${page - 1}`)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={createQueryString("page", `${page}`)} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink href={createQueryString("page", `${page + 1}`)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={createQueryString("page", `${totalPages}`)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={createQueryString("page", `${page + 1}`)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

function FiltersBar({ config }: { config: FilterConfig }) {
  const router = useRouter();
  const [price, setPrice] = useState<Range>({
    min: config.minPrice || 0,
    max: config.maxPrice || 1000000,
  });
  const [rating, setRating] = useState<Range>({
    min: config.minRating || 0,
    max: config.maxRating || 5,
  });
  const [ratingCount, setRatingCount] = useState<Range>({
    min: config.minRatingCount || 0,
    max: config.maxRatingCount || 10000,
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (price.min > 0) params.append("min-price", price.min.toString());
    if (price.max < 1000000) params.append("max-price", price.max.toString());
    if (rating.min > 0) params.append("min-rating", rating.min.toFixed(2));
    if (rating.max < 5) params.append("max-rating", rating.max.toFixed(2));
    if (ratingCount.min > 0)
      params.append("min-rating-count", ratingCount.min.toString());
    if (ratingCount.max < 10000)
      params.append("max-rating-count", ratingCount.max.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <aside className="w-full md:w-64 bg-white shadow-md rounded-lg p-6 space-y-6 h-fit">
      <h2 className="text-2xl font-bold text-gray-800">Filters</h2>

      <FilterSlider
        title="Price"
        range={price}
        setRange={setPrice}
        min={0}
        max={1000000}
        step={1}
        formatValue={(value) => formatPrice(value)}
      />

      <FilterSlider
        title="Rating"
        range={rating}
        setRange={setRating}
        min={0}
        max={5}
        step={0.01}
        formatValue={(value) => value.toFixed(2)}
      />

      <FilterSlider
        title="Rating Count"
        range={ratingCount}
        setRange={setRatingCount}
        min={0}
        max={10000}
        step={1}
        formatValue={(value) => value.toString()}
      />

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </aside>
  );
}

function FilterSlider({ title, range, setRange, min, max, step, formatValue }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatValue(range.min)}</span>
        <span>{formatValue(range.max)}</span>
      </div>
      <Slider
        className="mt-2"
        minStepsBetweenThumbs={1}
        value={[range.min, range.max]}
        max={max}
        min={min}
        step={step}
        onValueChange={([min, max]) => setRange({ min, max })}
      />
    </div>
  );
}
