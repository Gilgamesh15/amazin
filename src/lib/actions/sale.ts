"use server";

import { prisma } from "../prisma";

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
    id         String     @id @default(uuid())
  createdAt  DateTime   @default(now())
  endsAt     DateTime
  categoryId String     @unique
  name       String
  discounts  Discount[]
  category   Category   @relation(fields: [categoryId], references: [id])
   */

export async function addNewSale(
  endsAt: Date,
  categoryId: string,
  name: string
) {
  await prisma.sale.create({
    data: {
      endsAt,
      categoryId,
      name,
    },
  });
}
