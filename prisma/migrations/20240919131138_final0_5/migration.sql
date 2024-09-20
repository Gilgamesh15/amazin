/*
  Warnings:

  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Wishlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wishlistId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wishlistId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cartId" TEXT NOT NULL,
ADD COLUMN     "wishlistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "name",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "WishlistItem" ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "User_cartId_key" ON "User"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "User_wishlistId_key" ON "User"("wishlistId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
