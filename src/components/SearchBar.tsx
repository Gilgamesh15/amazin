"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export interface SearchBarProps {
  suggestions: {
    slug: string;
    name: string;
    image: string;
  }[];
}

export default function SearchBar({ suggestions }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setIsOpen(true);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hidden lg:block relative w-full max-w-md" ref={ref}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10 py-2 w-full rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          value={search}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && search && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[60vh] overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(({ name, image, slug }, index) => (
              <Fragment key={slug}>
                <Link href={`/product/${slug}`} className="block">
                  <div className="flex items-center gap-4 p-3 hover:bg-gray-100 transition duration-150">
                    <Image
                      src={image}
                      width={40}
                      height={40}
                      alt=""
                      className="object-cover rounded-md"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {name}
                    </span>
                  </div>
                </Link>
                {index < filteredSuggestions.length - 1 && <Separator />}
              </Fragment>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
