"use client";

import Image from "next/image";
import { useState } from "react";

export interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function handleClick(index: number) {
    setImageIndex(index);
  }
  console.log(imageIndex);
  return (
    <section className="gap-4 flex-[3] grid grid-cols-4 md:grid-cols-5 grid-rows-5 md:grid-rows-4">
      <Image
        alt=""
        src={images[imageIndex]}
        width={1024}
        height={1024}
        className="row-span-4 md:col-start-2 md:-col-end-1 col-span-4 border-2 border-slate-300/50 rounded-md w-full h-full object-cover"
      />
      <button
        onClick={() => handleClick(0)}
        className="row-span-1 md:row-start-1 col-span-1 aspect-square  transition-transform ease-in-out border-2 border-slate-300/50 hover:ring-1 rounded-md ring-black ring-offset-2 hover:scale-105"
      >
        <Image
          alt=""
          src={images[0]}
          width={1024}
          height={1024}
          className="object-cover w-full h-full"
        />
      </button>
      <button
        onClick={() => handleClick(1)}
        className="row-span-1 col-span-1 aspect-square  transition-transform ease-in-out border-2 border-slate-300/50 hover:ring-1 rounded-md ring-black ring-offset-2 hover:scale-105"
      >
        <Image
          alt=""
          src={images[1]}
          width={1024}
          height={1024}
          className="object-cover w-full h-full"
        />
      </button>
      <button
        onClick={() => handleClick(2)}
        className="row-span-1 col-span-1 aspect-square  transition-transform ease-in-out border-2 border-slate-300/50 hover:ring-1 rounded-md ring-black ring-offset-2 hover:scale-105"
      >
        <Image
          alt=""
          src={images[2]}
          width={1024}
          height={1024}
          className="object-cover w-full h-full"
        />
      </button>
      <button
        onClick={() => handleClick(3)}
        className="row-span-1 col-span-1 aspect-square transition-transform ease-in-out border-2 border-slate-300/50 hover:ring-1 rounded-md ring-black ring-offset-2 hover:scale-105"
      >
        <Image
          alt=""
          src={images[3]}
          width={1024}
          height={1024}
          className="object-cover w-full h-full"
        />
      </button>
    </section>
  );
}
