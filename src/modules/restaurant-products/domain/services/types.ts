import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProductCategory } from '@root/modules/restaurant-product-category/domain/entities/restaurant-product-category';

export interface UpdateUniqueRestaurantProductServiceData {
  restaurant_product_id: string;
  data: {
    restaurant_product?: Partial<{
      name: string;
      price: number;
      profile_photo?: string | null;
      product_category_id: string;
      restaurant_id: string;

      profile_photo_file?: CustomFile.File;
    }>;
    restaurant_product_promotion?: Partial<{
      id: string;
      description: string;
      promotional_price: number;
      restaurant_product_id: string;

      start_promotion_date: Date;
      end_promotion_date?: Date;
    }>;
  };
}

export interface CreateRestaurantProductServiceData {
  restaurant_product: {
    restaurant_id: string;
    name: string;
    price: number;
    profile_photo?: string | null;
    product_category_id: string;

    profile_photo_file?: CustomFile.File;
  };
  restaurant_product_promotion?: {
    description: string;
    promotional_price: number;

    start_promotion_date: Date;
    end_promotion_date?: Date;
  };
}

export interface ListManyProductsFromRestaurantServiceData {
  restaurant: IRestaurant;
  restaurantProductsCategory: IRestaurantProductCategory[];
}
