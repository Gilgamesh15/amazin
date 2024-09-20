"use client";

import { handleSignOut } from "@/lib/actions";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { HiUserCircle, HiLogout, HiLogin, HiUserAdd } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        disabled={status === "loading"}
        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-all duration-200 ease-in-out hover:opacity-80"
      >
        {status === "authenticated" && session.user?.image ? (
          <Avatar>
            <AvatarImage
              src={session.user.image}
              alt={session.user.name || "User avatar"}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        ) : (
          <HiUserCircle size={40} className="text-gray-600" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name || "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email || "Not signed in"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {status === "authenticated" ? (
          <>
            <DropdownMenuItem
              onSelect={handleSignOut}
              className="flex items-center text-red-600 focus:text-red-600"
            >
              <HiLogout className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/sign-in" className="flex items-center">
                <HiLogin className="mr-2 h-4 w-4" />
                <span>Log in</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-up" className="flex items-center">
                <HiUserAdd className="mr-2 h-4 w-4" />
                <span>Sign up</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
