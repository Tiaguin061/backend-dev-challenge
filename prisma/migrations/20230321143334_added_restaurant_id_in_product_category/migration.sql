/*
  Warnings:

  - Added the required column `restaurant_id` to the `restaurant_product_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant_product_category" ADD COLUMN     "restaurant_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurant_product_category" ADD CONSTRAINT "restaurant_product_category_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
