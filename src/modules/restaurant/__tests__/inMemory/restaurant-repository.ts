import { IRestaurant, Restaurant } from '../../domain/entities/restaurant';

import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private restaurants: IRestaurant[] = [];

  async create(restaurantData: IRestaurant): Promise<IRestaurant> {
    const restaurant = new Restaurant(restaurantData);

    this.restaurants.push(restaurant);

    return restaurant;
  }

  async listMany(): Promise<IRestaurant[]> {
    return this.restaurants;
  }

  async findUniqueById(restaurant_id: string): Promise<IRestaurant | null> {
    return this.restaurants.find((where) => where.id === restaurant_id);
  }
}
