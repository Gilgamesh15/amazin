"use server";

import { cookies } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { Wishlist, WishlistItem } from "@prisma/client";

async function createWishlist(userId?: string) {
  const wishlist = await prisma.wishlist.create({
    data: userId ? { userId } : {},
  });

  if (!userId) {
    cookies().set("wishlistId", wishlist.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return wishlist;
}

async function mergeWishlists(
  cookieWishlist: Wishlist & { wishlistItems: WishlistItem[] },
  userWishlist: Wishlist & { wishlistItems: WishlistItem[] }
) {
  const itemsToAdd: WishlistItem[] = cookieWishlist.wishlistItems.filter(
    (item: WishlistItem) =>
      !userWishlist.wishlistItems.some(
        (userItem: WishlistItem) => userItem.productId === item.productId
      )
  );

  await prisma.wishlistItem.createMany({
    data: itemsToAdd.map((item: WishlistItem) => ({
      ...item,
      wishlistId: userWishlist.id,
    })),
  });

  await prisma.wishlist.delete({
    where: { id: cookieWishlist.id },
  });

  cookies().delete("wishlistId");

  return userWishlist;
}

export async function validateWishlist() {
  const session = await auth();
  const userId = session?.user.id;
  const cookieWishlistId = cookies().get("wishlistId")?.value;

  if (!userId) {
    if (!cookieWishlistId) {
      return createWishlist();
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { id: cookieWishlistId },
    });

    if (!wishlist) {
      cookies().delete("wishlistId");
      return createWishlist();
    }

    return wishlist;
  }

  const userWishlist = await prisma.wishlist.findFirst({
    where: { userId },
    include: { wishlistItems: true },
  });

  if (!cookieWishlistId) {
    return userWishlist || createWishlist(userId);
  }

  const cookieWishlist = await prisma.wishlist.findFirst({
    where: { id: cookieWishlistId },
    include: { wishlistItems: true },
  });

  if (cookieWishlist && userWishlist) {
    return mergeWishlists(cookieWishlist, userWishlist);
  }

  if (cookieWishlist && !userWishlist) {
    const newUserWishlist = await prisma.wishlist.create({
      data: {
        userId,
        wishlistItems: {
          createMany: {
            data: cookieWishlist.wishlistItems.map((item: WishlistItem) => ({
              productId: item.productId,
            })),
          },
        },
      },
    });

    await prisma.wishlist.delete({
      where: { id: cookieWishlist.id },
    });

    cookies().delete("wishlistId");

    return newUserWishlist;
  }

  if (!cookieWishlist && userWishlist) {
    return userWishlist;
  }

  return createWishlist(userId);
}

export async function addProductToWishlist(productId: string) {
  const { id: wishlistId } = await validateWishlist();

  await prisma.wishlistItem.create({
    data: {
      productId,
      wishlistId,
    },
  });
}

export async function removeProductFromWishlist(productId: string) {
  const { id: wishlistId } = await validateWishlist();
  await prisma.wishlistItem.deleteMany({
    where: {
      wishlistId,
      productId,
    },
  });
}
