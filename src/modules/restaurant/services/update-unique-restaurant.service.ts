import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractUpdateUniqueRestaurantService } from '../domain/services/restaurant-services';
import { RestaurantRepository } from '../domain/repositories/restaurant-repository';
import { StorageProvider } from '../../../shared/providers/storageProvider/models/storage-provider';
import { UpdateUniqueRestaurantData } from '../domain/services/types';

@Injectable()
export class UpdateUniqueRestaurantService
  implements AbstractUpdateUniqueRestaurantService
{
  constructor(
    private restaurantRepository: RestaurantRepository,
    private storageProvider: StorageProvider,
  ) {}
  async execute({
    data: { profile_photo_buffer, ...data },
    restaurant_id,
  }: UpdateUniqueRestaurantData) {
    const foundRestaurant = await this.restaurantRepository.findUniqueById(
      restaurant_id,
    );

    if (!foundRestaurant) {
      throw new BadRequestException('Restaurant does not exist');
    }

    if (foundRestaurant.profile_photo) {
      data.profile_photo = await this.storageProvider.updateFile({
        newFilename: data.profile_photo,
        oldFilename: foundRestaurant.profile_photo,
        newFilenameBuffer: profile_photo_buffer,
      });
    }

    if (!foundRestaurant.profile_photo && data.profile_photo) {
      data.profile_photo = await this.storageProvider.saveFile({
        buffer: profile_photo_buffer,
        filename: data.profile_photo,
      });
    }

    const restaurantUpdated = await this.restaurantRepository.updateUnique({
      data,
      restaurant_id,
    });

    return restaurantUpdated;
  }
}
