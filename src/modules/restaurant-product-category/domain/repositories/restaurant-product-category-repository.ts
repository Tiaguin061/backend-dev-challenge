import { CreateRestaurantProductCategoryRepositoryData } from './types';
import { IRestaurantProductCategory } from '../entities/restaurant-product-category';

export abstract class RestaurantProductCategoryRepository {
  public abstract create(
    restaurant_product_category: CreateRestaurantProductCategoryRepositoryData,
  ): Promise<IRestaurantProductCategory>;

  public abstract findUniqueById(
    restaurant_product_category_id: string,
  ): Promise<IRestaurantProductCategory | null>;
}
