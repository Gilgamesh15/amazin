"use server";

import { prisma } from "../prisma";

/**
 *   id        String       @id @default(uuid())
  type      DiscountType
  value     Int
  productId String       @unique
  saleId    String
  product   Product      @relation(fields: [productId], references: [id])
  sale      Sale         @relation(fields: [saleId], references: [id])
 */
export async function addNewDiscount(
  type: "percentage" | "fixed",
  value: number,
  productId: string,
  saleId: string
) {
  await prisma.discount.create({
    data: {
      type: type === "percentage" ? "PERCENTAGE" : "FIXED",
      value,
      productId,
      saleId,
    },
  });
}
