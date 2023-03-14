import { IRestaurant } from '../entities/restaurant';

export abstract class RestaurantRepository {
  public abstract create(restaurant: IRestaurant): Promise<IRestaurant>;
  public abstract listMany(): Promise<IRestaurant[]>;

  public abstract findUniqueById(
    restaurant_id: string,
  ): Promise<IRestaurant | null>;
}
