"use server";

import { prisma } from "../prisma";
import slugify from "slugify";
import { validateCart } from "./cart";
import { validateWishlist } from "./wishlist";
import { Prisma } from "@prisma/client";

export async function getCategories(level: number = 0) {
  if (level === 0) {
    const levels = await prisma.category.findMany({
      select: {
        level: true,
      },
    });
    levels.forEach(({ level: catLevel }) => {
      if (level < catLevel) {
        level = catLevel;
      }
    });
  }
  return await prisma.category.findMany({
    where: {
      parent: null,
    },

    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          products: true,
        },
      },
      subcategories: {
        select: {
          id: true,
          name: true,
          slug: true,
          _count: {
            select: {
              products: true,
            },
          },
          subcategories: {
            select: {
              id: true,
              name: true,
              slug: true,
              _count: {
                select: {
                  products: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

type SingleCategoryQuery =
  | {
      select: {
        id: boolean;
        name: boolean;
        slug: boolean;
        _count: {
          select: {
            products: boolean;
          };
        };
        subcategories: boolean | SingleCategoryQuery;
      };
    }
  | Record<string, unknown>;

function createCategoryQuery(
  level: number = 0,
  prevQuery: SingleCategoryQuery = {}
): SingleCategoryQuery {
  if (level === 1) {
    return prevQuery;
  } else {
    return {
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            products: true,
          },
        },
        subcategories: prevQuery,
      },
    };
  }
}

export async function getTopPriorityCategories(
  categoryTake: number = 3,
  productTake: number = 10,
  categorySkip: number = 0,
  productSkip: number = 3
) {
  const { id: cartId } = await validateCart();
  const { id: wishlistId } = await validateWishlist();

  return await prisma.category.findMany({
    take: categoryTake,
    skip: categorySkip,
    include: {
      products: {
        take: productTake,
        skip: productSkip,
        include: {
          inCart: {
            where: {
              cartId: cartId,
            },
          },
          inWishlist: {
            where: {
              wishlistId: wishlistId,
            },
          },
          discount: true,
        },
      },
      saleCategory: true,
    },
    orderBy: {
      priority: "desc",
    },
  });
}

export async function addNewCategory(name: string, parentId?: string) {
  let newCategoryLevel = 0;
  if (parentId) {
    try {
      const { level: parentLevel } = await prisma.category.findFirstOrThrow({
        where: { id: parentId },
        select: { level: true },
      });

      newCategoryLevel = parentLevel + 1;
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return {
            message: `Category ${name} cannot be added as a subcategory to category with id of ${parentId}. No such parent category exists`,
          };
        }
      }
      return {
        message: `Unknown error has occured while adding new category(${name}).`,
      };
    }
  }

  //get categories slugs same to new slug
  const slugs = await prisma.category.findMany({
    where: {
      slug: {
        contains: slugify(name),
      },
    },
    select: {
      slug: true,
    },
  });
  //find slug indexes (every category slug if it's the same as some existing slug is as follows to be unique: `${slugify(name)}-${first unique number going from 1}`)
  const slugIndexes = slugs
    .map(({ slug }) => Number(slug[slug.length - 1]))
    .sort((a: number, b: number) => a - b);

  let firstAvalableSlugIndex = slugIndexes.length + 1;

  for (let i = 1; i < slugIndexes.length; i++) {
    if (slugIndexes[i] !== i) {
      firstAvalableSlugIndex = i;
      break;
    }
  }

  await prisma.category.create({
    data: {
      slug: `${slugify(name)}-${firstAvalableSlugIndex}`,
      name: name,
      level: newCategoryLevel,
      ...(parentId ? { parentId } : {}),
    },
  });
}

interface DeleteQuery {
  id?: string;
  parent?: DeleteQuery;
}

function createDeleteQuery(level: number, prevQuery: DeleteQuery): DeleteQuery {
  if (level === 0) {
    return prevQuery;
  } else {
    return { parent: createDeleteQuery(level - 1, prevQuery) };
  }
}

export async function deleteCategory(categoryId: string) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    return new Error("Deleting a non existent category.");
  }

  await prisma.category.deleteMany({
    where: {
      OR: [
        ...[...Array(category.level)].map((_, index) =>
          createDeleteQuery(index, { id: categoryId })
        ),
      ],
    },
  });
}

export async function addProductsToCategorie(
  categorieId: string,
  productIds: string[]
) {
  await prisma.category.update({
    where: {
      id: categorieId,
    },
    data: {
      products: {
        connect: [
          ...productIds.map((prodId) => ({
            id: prodId,
          })),
        ],
      },
    },
  });
}
