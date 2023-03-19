import { IRestaurant, Restaurant } from '../../domain/entities/restaurant';

import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { UpdateUniqueRestaurantServiceData } from '../../domain/services/types';

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private restaurants: IRestaurant[] = [];

  async create(restaurantData: IRestaurant): Promise<IRestaurant> {
    const restaurant = new Restaurant(restaurantData).restaurant;

    this.restaurants.push(restaurant);

    return restaurant;
  }

  async deleteUniqueById(restaurant_id: string): Promise<void> {
    const foundRestaurant = this.restaurants.find(
      (where) => where.id === restaurant_id,
    );

    if (!foundRestaurant) {
      return null;
    }

    this.restaurants.filter((where) => where.id !== restaurant_id);

    return;
  }

  async updateUnique({
    data,
    restaurant_id,
  }: UpdateUniqueRestaurantServiceData): Promise<IRestaurant> {
    const foundRestaurant = this.restaurants.find(
      (where) => where.id === restaurant_id,
    );

    if (!foundRestaurant) {
      return null;
    }

    const restaurantUpdated = new Restaurant(data).restaurant;

    this.restaurants.push(restaurantUpdated);

    return restaurantUpdated;
  }

  async listMany(): Promise<IRestaurant[]> {
    return this.restaurants;
  }

  async findUniqueById(restaurant_id: string): Promise<IRestaurant | null> {
    const restaurant = this.restaurants.find(
      (where) => where.id === restaurant_id,
    );

    return restaurant;
  }
}
