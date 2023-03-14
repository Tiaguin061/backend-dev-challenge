import { IRestaurant } from '../entities/restaurant';
import { UpdateUniqueRestaurantData } from '../services/types';

export abstract class RestaurantRepository {
  public abstract create(restaurant: IRestaurant): Promise<IRestaurant>;
  public abstract updateUnique(
    data: UpdateUniqueRestaurantData,
  ): Promise<IRestaurant | null>;
  public abstract deleteUniqueById(restaurant_id: string): Promise<void>;

  public abstract listMany(): Promise<IRestaurant[]>;

  public abstract findUniqueById(
    restaurant_id: string,
  ): Promise<IRestaurant | null>;
}
