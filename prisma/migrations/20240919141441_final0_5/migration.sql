/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `maxUses` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `minPurchase` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `usedCount` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `availabilityDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `helpfulVotes` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `notHelpfulVotes` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `addedAt` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bundle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BundleItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPreference` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discountId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chosenVariants` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountInStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInCents` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variants` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `chosenVariants` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "BundleItem" DROP CONSTRAINT "BundleItem_bundleId_fkey";

-- DropForeignKey
ALTER TABLE "BundleItem" DROP CONSTRAINT "BundleItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cartId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistItem" DROP CONSTRAINT "WishlistItem_productVariantId_fkey";

-- DropIndex
DROP INDEX "Discount_code_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "productVariantId",
ADD COLUMN     "chosenVariants" JSONB NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "keywords",
DROP COLUMN "level",
DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
ADD COLUMN     "saleCategorySaleId" TEXT;

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "code",
DROP COLUMN "isActive",
DROP COLUMN "maxUses",
DROP COLUMN "minPurchase",
DROP COLUMN "usedCount",
DROP COLUMN "validFrom",
DROP COLUMN "validTo",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "saleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "availabilityDate",
DROP COLUMN "basePrice",
DROP COLUMN "isPublished",
DROP COLUMN "keywords",
DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
DROP COLUMN "updatedAt",
ADD COLUMN     "amountInStock" INTEGER NOT NULL,
ADD COLUMN     "discountId" TEXT,
ADD COLUMN     "finalPriceInCents" INTEGER,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "priceInCents" INTEGER NOT NULL,
ADD COLUMN     "variants" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "content",
DROP COLUMN "helpfulVotes",
DROP COLUMN "notHelpfulVotes",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "body" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cartId" DROP NOT NULL,
ALTER COLUMN "wishlistId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "WishlistItem" DROP COLUMN "addedAt",
DROP COLUMN "productVariantId",
ADD COLUMN     "chosenVariants" JSONB NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Bundle";

-- DropTable
DROP TABLE "BundleItem";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "ProductAttribute";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductVariant";

-- DropTable
DROP TABLE "UserPreference";

-- DropEnum
DROP TYPE "AddressType";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_categoryId_key" ON "Sale"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Discount_productId_key" ON "Discount"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_discountId_key" ON "Product"("discountId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
