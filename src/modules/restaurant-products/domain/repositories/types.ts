export interface UpdateUniqueRestaurantProductRepositoryData {
  restaurant_product_id: string;
  data: Partial<{
    name: string;
    price: number;
    profile_photo?: string | null;
    product_category_id: string;
    restaurant_id: string;

    profile_photo_file?: CustomFile.File;
  }>;
}

export interface CreateRestaurantProductRepositoryData {
  name: string;
  price: number;
  profile_photo?: string | null;
  product_category_id: string;
  restaurant_id: string;
}
