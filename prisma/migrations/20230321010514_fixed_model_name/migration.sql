/*
  Warnings:

  - You are about to drop the `restaurant_product_promotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "restaurant_product_promotion" DROP CONSTRAINT "restaurant_product_promotion_restaurant_product_id_fkey";

-- DropTable
DROP TABLE "restaurant_product_promotion";

-- CreateTable
CREATE TABLE "restaurant_product_promotions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "promotional_price" INTEGER NOT NULL,
    "start_promotion_date" TIMESTAMP(3) NOT NULL,
    "end_promotion_date" TIMESTAMP(3) NOT NULL,
    "restaurant_product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_product_promotions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurant_product_promotions" ADD CONSTRAINT "restaurant_product_promotions_restaurant_product_id_fkey" FOREIGN KEY ("restaurant_product_id") REFERENCES "restaurant_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
