/*
  Warnings:

  - You are about to drop the column `product_promocion_id` on the `restaurant_products` table. All the data in the column will be lost.
  - Added the required column `restaurant_product_id` to the `restaurant_product_promotion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurant_products" DROP CONSTRAINT "restaurant_products_product_promocion_id_fkey";

-- AlterTable
ALTER TABLE "restaurant_product_promotion" ADD COLUMN     "restaurant_product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "restaurant_products" DROP COLUMN "product_promocion_id";

-- AddForeignKey
ALTER TABLE "restaurant_product_promotion" ADD CONSTRAINT "restaurant_product_promotion_restaurant_product_id_fkey" FOREIGN KEY ("restaurant_product_id") REFERENCES "restaurant_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
