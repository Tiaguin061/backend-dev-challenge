import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractListUniqueRestaurantProductService } from '../domain/services/restaurant-product-services';
import { IRestaurantProduct } from '../domain/entities/restaurant-product';
import { RestaurantProductRepository } from '../domain/repositories/restaurant-product-repository';

@Injectable()
export class ListUniqueRestaurantProductService
  implements AbstractListUniqueRestaurantProductService
{
  constructor(
    private restaurantProductRepository: RestaurantProductRepository,
  ) {}
  public async execute(
    restaurant_product_id: string,
  ): Promise<IRestaurantProduct> {
    const foundRestaurantProduct =
      await this.restaurantProductRepository.findUniqueById(
        restaurant_product_id,
      );

    if (!foundRestaurantProduct) {
      throw new BadRequestException('This restaurant product does not exist.');
    }

    return foundRestaurantProduct;
  }
}
