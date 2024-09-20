"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Package, Tag } from "lucide-react";

const iconMap = {
  "/dashboard": Home,
  "/dashboard/categories": Layers,
  "/dashboard/products": Package,
  "/dashboard/sales": Tag,
};

export default function DashboardLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const path = usePathname();
  const isActive = href === path;
  const Icon = iconMap[href as keyof typeof iconMap];

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-700 hover:bg-slate-200"
      }`}
    >
      {Icon && (
        <Icon
          size={20}
          className={`mr-3 ${isActive ? "text-indigo-700" : "text-gray-400"}`}
        />
      )}
      <span>{children}</span>
      {isActive && (
        <span className="ml-auto w-1.5 h-8 bg-indigo-700 rounded-full" />
      )}
    </Link>
  );
}
