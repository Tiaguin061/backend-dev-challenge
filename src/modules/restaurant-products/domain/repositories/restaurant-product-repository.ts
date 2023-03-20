import {
  CreateRestaurantProductRepositoryData,
  UpdateUniqueRestaurantProductRepositoryData,
} from './types';

import { IRestaurantProduct } from '../entities/restaurant-product';

export abstract class RestaurantProductRepository {
  public abstract create(
    restaurant_product: CreateRestaurantProductRepositoryData,
  ): Promise<IRestaurantProduct>;

  public abstract updateUnique(
    data: UpdateUniqueRestaurantProductRepositoryData,
  ): Promise<IRestaurantProduct>;

  public abstract deleteUniqueById(
    restaurant_product_id: string,
  ): Promise<void>;

  public abstract listManyFromRestaurantId(
    restaurant_id: string,
  ): Promise<IRestaurantProduct[]>;

  public abstract findUniqueById(
    restaurant_product_id: string,
  ): Promise<IRestaurantProduct | null>;
}
