import {
  IRestaurantProductCategory,
  RestaurantProductCategory,
} from '../../domain/entities/restaurant-product-category';

import { CreateRestaurantProductCategoryRepositoryData } from '../../domain/repositories/types';
import { RestaurantProductCategoryRepository } from '../../domain/repositories/restaurant-product-category-repository';

export class InMemoryRestaurantProductCategoryRepository
  implements RestaurantProductCategoryRepository
{
  private restaurantProductCategorys: IRestaurantProductCategory[] = [];

  async create(
    data: CreateRestaurantProductCategoryRepositoryData,
  ): Promise<IRestaurantProductCategory> {
    const restaurantProductCategory = new RestaurantProductCategory(data)
      .restaurantProductCategory;

    this.restaurantProductCategorys.push(restaurantProductCategory);

    return restaurantProductCategory;
  }

  async findUniqueById(
    restaurant_product_category_id: string,
  ): Promise<IRestaurantProductCategory | null> {
    return this.restaurantProductCategorys.find(
      (where) => where.id === restaurant_product_category_id,
    );
  }
}
