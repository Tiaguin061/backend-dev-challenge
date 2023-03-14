import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractDeleteUniqueRestaurantService } from '../domain/services/restaurant-services';
import { RestaurantRepository } from '../domain/repositories/restaurant-repository';
import { StorageProvider } from '../../../shared/providers/storageProvider/models/storage-provider';

@Injectable()
export class DeleteUniqueRestaurantService
  implements AbstractDeleteUniqueRestaurantService
{
  constructor(
    private restaurantRepository: RestaurantRepository,
    private storageProvider: StorageProvider,
  ) {}
  public async execute(restaurant_id: string): Promise<void> {
    const foundRestaurant = await this.restaurantRepository.findUniqueById(
      restaurant_id,
    );

    if (!foundRestaurant) {
      throw new BadRequestException('Restaurant does not exist');
    }

    await this.restaurantRepository.deleteUniqueById(foundRestaurant.id);

    if (foundRestaurant.profile_photo) {
      await this.storageProvider.deleteFile(foundRestaurant.profile_photo);
    }

    return;
  }
}
