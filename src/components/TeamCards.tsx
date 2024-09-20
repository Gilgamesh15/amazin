"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TeamCardProps } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamData } from "@/constants";
import { getIcon } from "@/lib/utils";

export default function TeamCards() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <Carousel
          className="select-none"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {teamData.map((card, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 xl:basis-1/4"
              >
                <TeamCard
                  image={card.image}
                  name={card.name}
                  position={card.position}
                  socialLinks={card.socialLinks}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="ml-4 sm:ml-0" />
            <CarouselNext className="mr-4 sm:mr-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function TeamCard({ image, name, position, socialLinks }: TeamCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={image}
            height={400}
            width={400}
            alt={name}
            className="object-cover w-full h-64 transition-transform object-top duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{position}</p>
        <ul className="flex space-x-3">
          {socialLinks.map((social) => (
            <li key={social.icon}>
              <Link
                href={social.href}
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                aria-label={`${name}'s ${social.icon}`}
              >
                {getIcon(social.icon, "w-5 h-5")}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
