import { IRestaurant } from '../entities/restaurant';

export abstract class RestaurantRepository {
  public abstract create(restaurant: IRestaurant): Promise<IRestaurant>;
}
