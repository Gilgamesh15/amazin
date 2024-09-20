import { getFeatured } from "@/lib/actions";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function FeaturedSection() {
  const featured = await getFeatured(5);

  return (
    <section className="w-full feature-grid">
      {featured.map((promotion, index) => (
        <PromotionCard
          key={promotion.href}
          gridItemName={`feature-grid_item-${index + 1}`}
          image={promotion.image}
          name={promotion.title}
          description={promotion.description}
          href={promotion.href}
        />
      ))}
    </section>
  );
}

export interface PromotionCardProps {
  image: string;
  name: string;
  description: string;
  href: string;
  hrefLabel?: string;
  gridItemName: string;
}

function PromotionCard({
  image,
  name,
  description,
  href,
  hrefLabel = "Buy Now",
  gridItemName,
}: PromotionCardProps) {
  return (
    <div
      className={cn(
        gridItemName,
        "group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-black/80 to-black"
      )}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm mb-4 line-clamp-2">{description}</p>
        <Button asChild variant="link" className="w-fit text-secondary p-0">
          <Link href={href}>{hrefLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
