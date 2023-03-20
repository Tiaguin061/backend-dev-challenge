/*
  Warnings:

  - You are about to drop the `product_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_promotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "restaurant_products" DROP CONSTRAINT "restaurant_products_product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "restaurant_products" DROP CONSTRAINT "restaurant_products_product_promocion_id_fkey";

-- DropTable
DROP TABLE "product_category";

-- DropTable
DROP TABLE "product_promotion";

-- CreateTable
CREATE TABLE "restaurant_product_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_product_promotion" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "promotional_price" TEXT NOT NULL,
    "start_promotion_date" TIMESTAMP(3) NOT NULL,
    "end_promotion_date" TIMESTAMP(3) NOT NULL,
    "is_closed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_product_promotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurant_products" ADD CONSTRAINT "restaurant_products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "restaurant_product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_products" ADD CONSTRAINT "restaurant_products_product_promocion_id_fkey" FOREIGN KEY ("product_promocion_id") REFERENCES "restaurant_product_promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
