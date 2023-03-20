/*
  Warnings:

  - You are about to drop the column `is_closed` on the `restaurant_product_promotion` table. All the data in the column will be lost.
  - You are about to drop the column `on_promotion` on the `restaurant_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurant_product_promotion" DROP COLUMN "is_closed";

-- AlterTable
ALTER TABLE "restaurant_products" DROP COLUMN "on_promotion";
