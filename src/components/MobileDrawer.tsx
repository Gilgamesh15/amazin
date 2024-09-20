"use client";

import { cn, getIcon } from "@/lib/utils";
import { NavIconType } from "@/lib/types";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Drawer onOpenChange={setIsOpen} open={isOpen}>
      <DrawerTrigger asChild>
        <HamburgerIcon isOpen={isOpen} handleClick={handleClick} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex justify-evenly">
          <MobileIcon icon="IoHome" label="Home" href="/" />
          <MobileIcon icon="FaSearch" label="Browse" href="/browse" />
          <MobileIcon icon="IoReader" label="About" href="/about" />
          <MobileIcon icon="MdEmail" label="Contact" href="/contact" />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

interface HamburgerIconProps {
  isOpen: boolean;
  handleClick: () => void;
}

function HamburgerIcon({ isOpen, handleClick }: HamburgerIconProps) {
  return (
    <button
      className="flex sm:hidden flex-col justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={handleClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={cn(
          "block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-in-out",
          isOpen ? "rotate-45 translate-y-[2px]" : "-translate-y-1"
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-in-out",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-in-out",
          isOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1"
        )}
      />
    </button>
  );
}

interface MobileIconProps {
  icon: NavIconType;
  label: string;
  href: string;
}

function MobileIcon({ icon, label, href }: MobileIconProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center",
        "w-20 h-20 p-2 rounded-2xl",
        "transition-all duration-200 ease-in-out",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-background text-foreground hover:bg-muted",
        "focus:outline-none focus:ring-2 focus:ring-primary"
      )}
    >
      {getIcon(
        icon,
        cn("size-8", isActive ? "text-primary-foreground" : "text-primary")
      )}
      <span className="mt-1 text-xs font-medium text-center leading-tight">
        {label}
      </span>
    </Link>
  );
}
