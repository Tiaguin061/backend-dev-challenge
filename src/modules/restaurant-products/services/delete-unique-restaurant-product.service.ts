import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractDeleteUniqueRestaurantProductService } from '../domain/services/restaurant-product-services';
import { RestaurantProductRepository } from '../domain/repositories/restaurant-product-repository';
import { StorageProvider } from '../../../shared/providers/storageProvider/models/storage-provider';

@Injectable()
export class DeleteUniqueRestaurantProductService
  implements AbstractDeleteUniqueRestaurantProductService
{
  constructor(
    private restaurantProductRepository: RestaurantProductRepository,
    private storageProvider: StorageProvider,
  ) {}
  public async execute(restaurant_product_id: string): Promise<void> {
    const foundRestaurantProduct =
      await this.restaurantProductRepository.findUniqueById(
        restaurant_product_id,
      );

    if (!foundRestaurantProduct) {
      throw new BadRequestException('Restaurant product does not exist.');
    }

    await this.restaurantProductRepository.deleteUniqueById(
      foundRestaurantProduct.id,
    );

    if (foundRestaurantProduct.profile_photo) {
      await this.storageProvider.deleteFile(
        foundRestaurantProduct.profile_photo,
      );
    }

    return;
  }
}
