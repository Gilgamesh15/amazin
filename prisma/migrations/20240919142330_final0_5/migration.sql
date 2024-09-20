/*
  Warnings:

  - The `chosenVariants` column on the `CartItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `variants` on the `Product` table. All the data in the column will be lost.
  - The `chosenVariants` column on the `WishlistItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "chosenVariants",
ADD COLUMN     "chosenVariants" TEXT[];

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "variants",
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WishlistItem" DROP COLUMN "chosenVariants",
ADD COLUMN     "chosenVariants" TEXT[];
