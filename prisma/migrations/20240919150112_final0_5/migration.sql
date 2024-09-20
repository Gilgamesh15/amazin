/*
  Warnings:

  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "amountInStock" SET DEFAULT 0;
