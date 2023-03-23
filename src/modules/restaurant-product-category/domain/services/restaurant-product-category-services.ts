import { CreateRestaurantProductCategoryServiceData } from './types';
import { IRestaurantProductCategory } from '../entities/restaurant-product-category';

export abstract class AbstractCreateRestaurantProductCategoryService {
  public abstract execute(
    data: CreateRestaurantProductCategoryServiceData,
  ): Promise<IRestaurantProductCategory>;
}
