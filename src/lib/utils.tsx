import { BsShop } from "react-icons/bs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdEmail, MdShoppingBag } from "react-icons/md";
import { CiBag1 } from "react-icons/ci";
import { GetTopPriorityCategoriesReturnType, IconType } from "./types";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaSearch } from "react-icons/fa";
import { TbHeadset, TbTruckDelivery } from "react-icons/tb";
import { IoHome, IoReader, IoShieldCheckmark } from "react-icons/io5";
import { ProductSectionProps } from "@/components/ProductSection";
import { noImageUrl } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIcon(icon: IconType, iconClassName?: string) {
  switch (icon) {
    case "IoShieldCheckmark":
      return <IoShieldCheckmark className={iconClassName} />;
    case "TbHeadset":
      return <TbHeadset className={iconClassName} />;
    case "TbTruckDelivery":
      return <TbTruckDelivery className={iconClassName} />;
    case "BsShop":
      return <BsShop className={iconClassName} />;
    case "RiMoneyDollarCircleLine":
      return <RiMoneyDollarCircleLine className={iconClassName} />;
    case "MdShoppingBag":
      return <MdShoppingBag className={iconClassName} />;
    case "CiBag1":
      return <CiBag1 className={iconClassName} />;
    case "FaXTwitter":
      return <FaXTwitter className={iconClassName} />;
    case "FaLinkedin":
      return <FaLinkedin className={iconClassName} />;
    case "FaGithub":
      return <FaGithub className={iconClassName} />;
    case "IoHome":
      return <IoHome size={32} className={iconClassName} />;
    case "IoReader":
      return <IoReader size={32} className={iconClassName} />;
    case "MdEmail":
      return <MdEmail size={32} className={iconClassName} />;
    case "FaSearch":
      return <FaSearch size={32} className={iconClassName} />;
  }
}

export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    roundingMode: "ceil",
  }).format(priceInCents / 100);
}

export function formatPercentage(percentage: number) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    roundingMode: "ceil",
  }).format(percentage / 100);
}

export function calculateFinalPrice(
  basePriceInCents: number,
  discountType: "fixed" | "percentage",
  discountValue: number
) {
  //It is assumed that percentage discounts are specified as:
  //value = 1000 => discount of 10%
  //value = 30 => discount of 0,3%
  //value = 999999 => discount of 9999,99%
  return discountType === "fixed"
    ? basePriceInCents - discountValue
    : basePriceInCents - (discountValue / 10000) * basePriceInCents;
}

export function formatGetTopPriorityCategories(
  data: GetTopPriorityCategoriesReturnType
): ProductSectionProps[] {
  return data.map((category) => ({
    products: category.products.map((item) => ({
      product: {
        id: item.id,
        name: item.name,
        slug: item.slug,
        priceInCents: item.priceInCents,
        ...(item.discount
          ? {
              discountType:
                item.discount.type === "FIXED" ? "fixed" : "percentage",
              discountValue: item.discount.value,
            }
          : {}),
        rating: item.rating,
        ratingCount: item.ratingCount,
        image: item.images.length > 1 ? item.images[0] : noImageUrl,
      },
      wishlisted: item.inCart.length > 0 ? true : false,
      inCart: item.inWishlist.length > 0 ? true : false,
    })),
    categorie: {
      slug: category.slug,
      name: category.name,
    },
    ...(category.saleCategory
      ? {
          sale: {
            label: category.saleCategory.name,
            endDate: category.saleCategory.endsAt,
          },
        }
      : {}),
  }));
}
