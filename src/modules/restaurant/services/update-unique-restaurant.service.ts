import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractUpdateUniqueRestaurantService } from '@root/modules/restaurant/domain/services/restaurant-services';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';
import { UpdateUniqueRestaurantServiceData } from '@root/modules/restaurant/domain/services/types';

@Injectable()
export class UpdateUniqueRestaurantService
  implements AbstractUpdateUniqueRestaurantService
{
  constructor(
    private restaurantRepository: RestaurantRepository,
    private storageProvider: StorageProvider,
  ) {}
  async execute({ data, restaurant_id }: UpdateUniqueRestaurantServiceData) {
    const { profile_photo_file, ..._data } = data;
    const foundRestaurant = await this.restaurantRepository.findUniqueById(
      restaurant_id,
    );

    if (!foundRestaurant) {
      throw new BadRequestException('Restaurant does not exist');
    }

    let profile_photo: null | string = foundRestaurant.profile_photo;

    if (profile_photo && profile_photo_file) {
      profile_photo = await this.storageProvider.updateFile({
        newFilename: profile_photo_file.originalname,
        oldFilename: profile_photo,
        newFilenameBuffer: profile_photo_file.buffer,
      });
    }

    if (!profile_photo && profile_photo_file) {
      profile_photo = await this.storageProvider.saveFile({
        buffer: profile_photo_file.buffer,
        filename: profile_photo_file.originalname,
      });
    }

    const restaurantUpdated = await this.restaurantRepository.updateUnique({
      data: {
        ..._data,
        profile_photo,
      },
      restaurant_id,
    });

    return restaurantUpdated;
  }
}
