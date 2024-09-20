import { cn } from "@/lib/utils";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface CategoryAccordionProps {
  categories: CategoryType[];
  level?: number;
}

interface CategoryType {
  slug: string;
  name: string;
  subcategories?: CategoryType[];
}

export default function CategoriesAccordion({
  categories,
}: CategoryAccordionProps) {
  return <SingleCategoryAccordion categories={categories} />;
}

function SingleCategoryAccordion({
  categories,
  level = 0,
}: CategoryAccordionProps) {
  return (
    <Accordion type="single" collapsible>
      {categories.map((category) => {
        const hasSubcategories =
          category.subcategories && category.subcategories.length > 0;

        return (
          <AccordionItem
            key={category.name}
            value={category.name}
            className="border-0"
          >
            <AccordionTrigger
              className={cn(
                !hasSubcategories && "*:*:hidden",
                "flex justify-between items-center py-2 px-4 text-sm font-medium hover:bg-muted/50 transition-colors"
              )}
            >
              <Link
                href={`/search?category=${category.slug}`}
                className="flex-grow text-left hover:underline"
              >
                {category.name}
              </Link>
            </AccordionTrigger>
            {hasSubcategories && (
              <AccordionContent
                style={{ marginLeft: `${(level + 1) * 8}px` }}
                className="p-0"
              >
                <SingleCategoryAccordion
                  categories={category.subcategories!}
                  level={level + 1}
                />
              </AccordionContent>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
