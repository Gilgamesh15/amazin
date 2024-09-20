"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { GetProductsConfigType } from "../types/actionsTypes";
import slugify from "slugify";

export async function getProduct(id: string) {
  return await prisma.product.findFirst({
    where: {
      id: id,
    },
  });
}

const buildWhereClause = (
  config: Omit<GetProductsConfigType, "page">
): Prisma.ProductWhereInput => {
  const {
    categories,
    name,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    minRatingCount,
    maxRatingCount,
  } = config;

  return {
    ...(name && { name: { contains: name, mode: "insensitive" } }),
    ...(minPrice || maxPrice
      ? {
          priceInCents: {
            ...(minPrice && { gte: minPrice }),
            ...(maxPrice && { lte: maxPrice }),
          },
        }
      : {}),
    ...(minRating || maxRating
      ? {
          rating: {
            ...(minRating && { gte: minRating }),
            ...(maxRating && { lte: maxRating }),
          },
        }
      : {}),
    ...(minRatingCount || maxRatingCount
      ? {
          ratingCount: {
            ...(minRatingCount && { gte: minRatingCount }),
            ...(maxRatingCount && { lte: maxRatingCount }),
          },
        }
      : {}),
    ...(categories && categories.length > 0
      ? {
          categories: {
            some: {
              id: { in: categories },
            },
          },
        }
      : {}),
  };
};

export async function getProducts(config: GetProductsConfigType) {
  const { page = 1 } = config;
  const pageSize = 10;

  return await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    where: buildWhereClause(config),
    include: {
      discount: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductsCount(
  config: Omit<GetProductsConfigType, "page">
) {
  return await prisma.product.count({
    where: buildWhereClause(config),
  });
}

export async function getProductSuggestions() {
  return await prisma.product.findMany({
    select: {
      name: true,
      slug: true,
      images: true,
    },
  });
}
export async function createNewProduct(
  name: string,
  images: string[],
  description: string,
  priceInCents: number,
  categorieIds: string[],
  amountInStock?: number
) {
  if (images.length < 4) {
    return new Error("Product cannot be created with less then 4 images");
  }
  if (categorieIds.length === 0) {
    return new Error("Product has to have at least 1 assigned category");
  }
  const sameSlugProdCnt = await prisma.product.count({
    where: {
      slug: slugify(name),
    },
  });
  await prisma.product.create({
    data: {
      slug: `${slugify(name)}-${sameSlugProdCnt + 1}}`,
      name,
      images,
      description,
      priceInCents,
      categories: {
        connect: [
          ...categorieIds.map((catId) => ({
            id: catId,
          })),
        ],
      },
      ...(amountInStock ? { amountInStock } : {}),
    },
  });
}
