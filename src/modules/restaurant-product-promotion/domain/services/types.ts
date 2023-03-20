export interface UpdateUniqueRestaurantProductPromotionServiceData {
  restaurant_product_promotion_id: string;
  data: Partial<{
    description: string;
    promotional_price: number;
    start_promotion_date: Date;
    end_promotion_date?: Date;
    restaurant_product_id: string;
  }>;
}

export interface CreateRestaurantProductPromotionServiceData {
  description: string;
  promotional_price: number;
  start_promotion_date: Date;
  end_promotion_date?: Date;
  restaurant_product_id: string;
}
