"use server";

import { prisma } from "../prisma";

export async function getFeatured(take: number = 5) {
  return await prisma.featured.findMany({
    take,
  });
}

export async function addNewFeatured(
  target: "category" | "product",
  id: string,
  image: string,
  title: string,
  description: string
) {
  await prisma.featured.create({
    data: {
      type: target === "category" ? "CATEGORY" : "PRODUCT",
      ...(target === "category"
        ? {
            categoryId: id,
          }
        : { categoryId: id }),
      image,
      title,
      description,
    },
  });
}
