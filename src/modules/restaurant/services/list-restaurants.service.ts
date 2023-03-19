import { AbstractListRestaurantsService } from '@root/modules/restaurant/domain/services/restaurant-services';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

@Injectable()
export class ListRestaurantsService implements AbstractListRestaurantsService {
  constructor(private restaurantRepository: RestaurantRepository) {}
  async execute() {
    const restaurants = await this.restaurantRepository.listMany();

    return restaurants;
  }
}
