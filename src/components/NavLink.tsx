"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  children: string;
  href: string;
  className?: string;
}

export default function NavLink({ children, href, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:text-primary",
        isActive
          ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
          : "text-muted-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
}
