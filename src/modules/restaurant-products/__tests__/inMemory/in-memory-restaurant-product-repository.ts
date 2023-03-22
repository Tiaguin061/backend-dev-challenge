import {
  CreateRestaurantProductRepositoryData,
  UpdateUniqueRestaurantProductRepositoryData,
} from '../../domain/repositories/types';
import {
  IRestaurantProduct,
  RestaurantProduct,
} from '../../domain/entities/restaurant-product';

import { RestaurantProductRepository } from '../../domain/repositories/restaurant-product-repository';
import { mergeData } from '@root/shared/utils/mergeData';

export class InMemoryRestaurantProductRepository
  implements RestaurantProductRepository
{
  private restaurantProducts: IRestaurantProduct[] = [];

  async create(
    restaurant_product_data: CreateRestaurantProductRepositoryData,
  ): Promise<IRestaurantProduct> {
    const restaurantProduct = new RestaurantProduct(restaurant_product_data)
      .restaurantProduct;

    this.restaurantProducts.push(restaurantProduct);

    return restaurantProduct;
  }

  async deleteUniqueById(restaurant_product_id: string): Promise<void> {
    const foundRestaurantProduct = this.restaurantProducts.find(
      (where) => where.id === restaurant_product_id,
    );

    if (!foundRestaurantProduct) {
      return null;
    }

    this.restaurantProducts.filter(
      (where) => where.id !== restaurant_product_id,
    );

    return;
  }

  async updateUnique({
    data,
    restaurant_product_id,
  }: UpdateUniqueRestaurantProductRepositoryData): Promise<IRestaurantProduct | null> {
    let foundRestaurantProduct = this.restaurantProducts.find(
      (where) => where.id === restaurant_product_id,
    );

    if (!foundRestaurantProduct) {
      return null;
    }

    foundRestaurantProduct = mergeData(foundRestaurantProduct, data);

    this.restaurantProducts.push(foundRestaurantProduct);

    return foundRestaurantProduct;
  }

  async findUniqueById(
    restaurant_product_id: string,
  ): Promise<IRestaurantProduct | null> {
    return this.restaurantProducts.find(
      (where) => where.id === restaurant_product_id,
    );
  }
}
