"use server";

import { cookies } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { Cart, CartItem } from "@prisma/client";

async function createCart(userId?: string) {
  const cart = await prisma.cart.create({
    data: userId ? { userId } : {},
  });

  if (!userId) {
    cookies().set("cartId", cart.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return cart;
}

async function mergeCarts(
  cookieCart: Cart & { cartItems: CartItem[] },
  userCart: Cart & { cartItems: CartItem[] }
) {
  const itemsToAdd: CartItem[] = cookieCart.cartItems.filter(
    (item: CartItem) =>
      !userCart.cartItems.some(
        (userItem: CartItem) => userItem.productId === item.productId
      )
  );

  await prisma.cartItem.createMany({
    data: itemsToAdd.map((item: CartItem) => ({
      ...item,
      cartId: userCart.id,
    })),
  });

  await prisma.cart.delete({
    where: { id: cookieCart.id },
  });

  cookies().delete("cartId");

  return userCart;
}

export async function validateCart() {
  const session = await auth();
  const userId = session?.user.id;
  const cookieCartId = cookies().get("cartId")?.value;

  if (!userId) {
    if (!cookieCartId) {
      return createCart();
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cookieCartId },
    });

    if (!cart) {
      cookies().delete("cartId");
      return createCart();
    }

    return cart;
  }

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { cartItems: true },
  });

  if (!cookieCartId) {
    return userCart || createCart(userId);
  }

  const cookieCart = await prisma.cart.findFirst({
    where: { id: cookieCartId },
    include: { cartItems: true },
  });

  if (cookieCart && userCart) {
    return mergeCarts(cookieCart, userCart);
  }

  if (cookieCart && !userCart) {
    const newUserCart = await prisma.cart.create({
      data: {
        userId,
        cartItems: {
          createMany: {
            data: cookieCart.cartItems.map((item: CartItem) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });

    await prisma.cart.delete({
      where: { id: cookieCart.id },
    });

    cookies().delete("cartId");

    return newUserCart;
  }

  if (!cookieCart && userCart) {
    return userCart;
  }

  return createCart(userId);
}

export async function addProductToCart(productId: string, quantity?: number) {
  const { id: cartId } = await validateCart();

  await prisma.cartItem.create({
    data: {
      productId,
      cartId,
      ...(quantity ? { quantity } : {}),
    },
  });
}

export async function removeProductFromCart(productId: string) {
  const { id: cartId } = await validateCart();
  await prisma.cartItem.deleteMany({
    where: {
      cartId,
      productId,
    },
  });
}
