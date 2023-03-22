import { IRestaurant } from '../entities/restaurant';
import { ListManyProductsFromRestaurantRepositoryData } from '@root/modules/restaurant-products/domain/repositories/types';
import { UpdateUniqueRestaurantRepositoryData } from './types';

export abstract class RestaurantRepository {
  public abstract create(restaurant: IRestaurant): Promise<IRestaurant>;
  public abstract updateUnique(
    data: UpdateUniqueRestaurantRepositoryData,
  ): Promise<IRestaurant>;
  public abstract deleteUniqueById(restaurant_id: string): Promise<void>;

  public abstract listMany(): Promise<IRestaurant[]>;

  public abstract findUniqueById(
    restaurant_id: string,
  ): Promise<IRestaurant | null>;

  public abstract listManyProductFromRestaurantId(
    restaurant_id: string,
  ): Promise<ListManyProductsFromRestaurantRepositoryData>;
}
