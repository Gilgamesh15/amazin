import { Button } from "@/components/ui/button";
import { getUserCart } from "@/lib/actions";
import Link from "next/link";
import { CartForm } from "@/components";
import { ShoppingCart, Heart } from "lucide-react";

export default async function CartPage() {
  const cartProducts = await getUserCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-poppins font-medium text-center mb-12">
        Your Shopping Cart
      </h1>

      {cartProducts.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <p className="text-2xl md:text-3xl font-poppins font-medium mb-8">
            Your cart is empty
          </p>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet. Start
            shopping and discover amazing products!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/search" className="flex items-center justify-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link
                href="/wishlist"
                className="flex items-center justify-center"
              >
                <Heart className="mr-2 h-4 w-4" />
                View Wishlist
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <CartForm products={cartProducts} />
      )}
    </div>
  );
}
