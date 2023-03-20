/*
  Warnings:

  - Changed the type of `promotional_price` on the `restaurant_product_promotion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "restaurant_product_promotion" DROP COLUMN "promotional_price",
ADD COLUMN     "promotional_price" INTEGER NOT NULL;
