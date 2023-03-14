import { IRestaurant } from '../entities/restaurant';

export abstract class RestaurantRepository {
  public abstract create(restaurant: IRestaurant): Promise<IRestaurant>;
  public abstract updateUnique(data: {
    data: IRestaurant;
    restaurant_id: string;
  }): Promise<IRestaurant | null>;
  public abstract deleteUniqueById(restaurant_id: string): Promise<void>;

  public abstract listMany(): Promise<IRestaurant[]>;

  public abstract findUniqueById(
    restaurant_id: string,
  ): Promise<IRestaurant | null>;
}
