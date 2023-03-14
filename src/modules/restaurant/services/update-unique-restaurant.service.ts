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
  async execute({ data, restaurant_id }: UpdateUniqueRestaurantData) {
    const { profile_photo_file, ..._data } = data;
    const foundRestaurant = await this.restaurantRepository.findUniqueById(
      restaurant_id,
    );

    if (!foundRestaurant) {
      throw new BadRequestException('Restaurant does not exist');
    }

    if (foundRestaurant.profile_photo && profile_photo_file) {
      _data.profile_photo = await this.storageProvider.updateFile({
        newFilename: profile_photo_file.originalname,
        oldFilename: foundRestaurant.profile_photo,
        newFilenameBuffer: profile_photo_file.buffer,
      });
    }

    if (!foundRestaurant.profile_photo && profile_photo_file) {
      _data.profile_photo = await this.storageProvider.saveFile({
        buffer: profile_photo_file.buffer,
        filename: profile_photo_file.originalname,
      });
    }

    const restaurantUpdated = await this.restaurantRepository.updateUnique({
      data: {
        ..._data,
        profile_photo: _data.profile_photo,
      },
      restaurant_id,
    });

    return restaurantUpdated;
  }
}
