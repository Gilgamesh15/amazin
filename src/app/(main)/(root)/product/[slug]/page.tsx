import {
  ExpandableText,
  Price,
  Rating,
  AddToCartForm,
  ProductImages,
  ProductSection,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import { getProduct, getTopPriorityCategories } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function SigngleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }
  const categorie = await getTopPriorityCategories(1, 20);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-8">
        <ProductImages images={product.images} />
        <Separator className="sm:hidden" />
        <div className="flex-[2]">
          <h1 className="text-black text-2xl font-semibold leading-normal tracking-wide">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <Rating rating={product.rating} count={product.ratingCount} />
            {" | "}
            <span
              className={cn(
                "opacity-60 text-sm font-normal leading-tight font-poppins",
                product.amountInStock ? "text-green-500" : "text-destructive"
              )}
            >
              {product.amountInStock ? "In Stock" : "Unavailable"}
            </span>
          </div>
          <Price priceInCents={product.priceInCents} />
          <ExpandableText collapseHeight="90px">
            {product.description}
          </ExpandableText>
          <AddToCartForm
            variants={{
              size: ["S", "M", "L", "XL"],
              color: ["Black", "White", "Blue", "Red"],
            }}
          />
        </div>
      </div>
      {categorie.map(
        (categorie) =>
          categorie.products.length > 0 && (
            <>
              <ProductSection
                key={categorie.id}
                products={categorie.products}
                {...(categorie.sale ? { discount: categorie.sale } : {})}
                id={categorie.id}
                label={categorie.label}
              />
              <Separator />
            </>
          )
      )}
    </>
  );
}
