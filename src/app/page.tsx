import {
  CategoriesAccordion,
  CategoriesBarSkeleton,
  FeaturedSection,
  ProductSection,
  Features,
  FeaturedSkeleton,
} from "@/components";
import { CategoryAccordionProps } from "@/components/CategoryAccordion";
import { ProductSectionProps } from "@/components/ProductSection";

import { Separator } from "@/components/ui/separator";
import { getCategories, getTopPriorityCategories } from "@/lib/actions";
import { formatGetTopPriorityCategories } from "@/lib/utils";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <article className="flex gap-4 h-96">
        {/**CATEGORIES ACCORDION */}

        <aside className="w-[320px] hidden md:block h-[400px] overflow-y-scroll scroll-smooth scrollbar-hidden">
          <Suspense fallback={<CategoriesBarSkeleton />}>
            <AsyncCategorieAccordion />
          </Suspense>
        </aside>

        <Separator orientation="vertical" className="hidden md:block" />

        {/**FEATURED SECTION */}
        {/** <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedSection />
        </Suspense> */}
      </article>

      <Separator />

      {[...Array(3)].map((_, index) => (
        <Suspense
          key={index}
          fallback={/**REPLACE WITH ACTUAL FALLBACK */ null}
        >
          <AsyncProductSection index={index} />
        </Suspense>
      ))}
      <Features />
    </main>
  );
}

interface AsyncProductSectionProps {
  index: number;
}

async function AsyncProductSection({ index }: AsyncProductSectionProps) {
  const categories = await getTopPriorityCategories(1, 20, index);

  if (categories.length < 1) return null;

  const formattedCategory: ProductSectionProps =
    formatGetTopPriorityCategories(categories)[0];

  return <ProductSection key={categories[0].id} {...formattedCategory} />;
}

async function AsyncCategorieAccordion() {
  const categories: CategoryAccordionProps = {
    categories: await getCategories(5),
  };

  return <CategoriesAccordion {...categories} />;
}
