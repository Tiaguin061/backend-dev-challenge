import { CreateRestaurantProductCategoryRepositoryData } from '../repositories/types';
import { IRestaurantProductCategory } from '../entities/restaurant-product-category';

export abstract class AbstractCreateRestaurantProductCategoryService {
  public abstract execute(
    data: CreateRestaurantProductCategoryRepositoryData,
  ): Promise<IRestaurantProductCategory>;
}
