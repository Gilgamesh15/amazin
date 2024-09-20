import { getProductSuggestions } from "@/lib/actions";

import Image from "next/image";
import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import MobileDrawer from "./MobileDrawer";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";

export default async function NavBar() {
  const suggestions = await getProductSuggestions().then((products) =>
    products.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.images.length > 0 ? product.images[0] : "/no-image.png",
    }))
  );

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <MobileDrawer />
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                width={200}
                height={70}
                alt="logo"
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search">Browse</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact us</NavLink>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <SearchBar suggestions={suggestions} />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/wishlist"
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-all duration-200 ease-in-out hover:opacity-80"
              aria-label="Wishlist"
            >
              <FaHeart size={32} className="text-gray-600" />
            </Link>
            <Link
              href="/cart"
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-all duration-200 ease-in-out hover:opacity-80"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart size={32} className="text-gray-600" />
            </Link>
            <ProfileDropdown />
          </div>
        </nav>
      </div>

      <div className="sm:hidden px-4 py-2 bg-muted">
        <SearchBar suggestions={suggestions} />
      </div>
    </header>
  );
}
