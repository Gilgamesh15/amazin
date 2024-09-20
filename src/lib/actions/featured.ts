"use server";

import { prisma } from "../prisma";

export async function getFeatured(take: number = 5) {
  return await prisma.featured.findMany({
    take,
  });
}

/**
   * id                 String     @id @default(uuid())
  slug               String    @unique
  name               String
  parentId           String?
  saleCategorySaleId String?
  parent             Category?  @relation("CategoryParent", fields: [parentId], references: [id], onDelete: Cascade)
  subcategories      Category[] @relation("CategoryParent")
  featured           Featured?
  saleCategory       Sale?
  products           Product[]  @relation("CategoryToProduct")

  priority Int @default(0)

  model Featured {
  id          String       @id @default(uuid())
  type        FeaturedType
  productId   String?      @unique
  categoryId  String?      @unique
  image       String
  title       String
  description String
  category    Category?    @relation(fields: [categoryId], references: [id])
  product     Product?     @relation(fields: [productId], references: [id])
}
   */

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
