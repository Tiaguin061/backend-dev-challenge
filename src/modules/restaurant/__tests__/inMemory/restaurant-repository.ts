import { IRestaurant, Restaurant } from '../../domain/entities/restaurant';

import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private restaurants: IRestaurant[] = [];

  async create(restaurantData: IRestaurant): Promise<IRestaurant> {
    const restaurant = new Restaurant(restaurantData);

    Object.assign(restaurant, restaurantData);

    this.restaurants.push(restaurant);

    return restaurant;
  }
}
