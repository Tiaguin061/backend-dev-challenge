-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "opening_hour" TEXT NOT NULL,
    "profile_photo" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "profile_photo" TEXT,
    "on_promotion" BOOLEAN NOT NULL DEFAULT false,
    "product_category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "product_promocion_id" TEXT,

    CONSTRAINT "restaurant_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_promotion" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "promotional_price" INTEGER NOT NULL,
    "start_promotion_date" TIMESTAMP(3) NOT NULL,
    "end_promotion_date" TIMESTAMP(3) NOT NULL,
    "is_closed" BOOLEAN NOT NULL,

    CONSTRAINT "product_promotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_products" ADD CONSTRAINT "restaurant_products_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_products" ADD CONSTRAINT "restaurant_products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_products" ADD CONSTRAINT "restaurant_products_product_promocion_id_fkey" FOREIGN KEY ("product_promocion_id") REFERENCES "product_promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
