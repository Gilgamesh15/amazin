import { ProductSection } from "@/components";
import { getTopPriorityCategories, getUserWishlist } from "@/lib/actions";

export default async function WishlistPage() {
  const wishlist = await getUserWishlist();
  const category = await getTopPriorityCategories(1, 20);

  return (
    <article className="flex flex-col gap-16">
      <ProductSection
        products={wishlist}
        label={`Wishlist (${wishlist.length})`}
        href="/cart"
        hrefLabel="Go to Cart"
      />
      {category && category.length > 0 && (
        <ProductSection
          products={category[0].products}
          label="Just for you"
          href={`/search?category=${category[0].id}`}
          hrefLabel="See more"
        />
      )}
    </article>
  );
}
