"use client";

import React, { useState, useRef, useEffect } from "react";
import { Separator } from "./ui/separator";

export default function ExpandableText({
  children,
  collapseHeight,
}: {
  children: string;
  collapseHeight: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(collapseHeight);
  const contentRef = useRef<HTMLParagraphElement>(null);

  function handleClick() {
    setIsExpanded((prev) => !prev);
  }

  useEffect(() => {
    if (isExpanded) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight(collapseHeight);
    }
  }, [isExpanded, collapseHeight]);

  return (
    <div>
      <p
        ref={contentRef}
        className="text-black text-sm font-normal font-poppins leading-tight overflow-hidden"
        style={{
          maxHeight: height,
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {children}
      </p>
      <div className="flex items-center">
        <Separator className="flex-1" />
        <button
          onClick={handleClick}
          className="w-[25%] border-2 rounded-3xl px-4 text-center text-xs flex items-center justify-center bg-slate-200"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
