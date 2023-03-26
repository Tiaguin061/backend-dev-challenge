import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractCreateRestaurantProductService } from '../domain/services/restaurant-product-services';
import { CreateRestaurantProductServiceData } from '../domain/services/types';
import { RestaurantProductCategoryRepository } from '@root/modules/restaurant-product-category/domain/repositories/restaurant-product-category-repository';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '../domain/repositories/restaurant-product-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '../../../shared/providers/storageProvider/models/storage-provider';

@Injectable()
export class CreateRestaurantProductService
  implements AbstractCreateRestaurantProductService
{
  constructor(
    private restaurantProductRepository: RestaurantProductRepository,
    private restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
    private storageProvider: StorageProvider,
    private restaurantRepository: RestaurantRepository,
    private restaurantProductCategoryRepository: RestaurantProductCategoryRepository,
  ) {}
  async execute(data: CreateRestaurantProductServiceData) {
    const { restaurant_product, restaurant_product_promotion } = data;

    const { profile_photo_file, ..._data } = restaurant_product;

    const foundRestaurant = await this.restaurantRepository.findUniqueById(
      _data.restaurant_id,
    );

    if (!foundRestaurant) {
      throw new BadRequestException('Restaurant does not exist.');
    }

    if (restaurant_product?.product_category_id) {
      const foundCategory =
        await this.restaurantProductCategoryRepository.findUniqueById(
          restaurant_product.product_category_id,
        );

      if (!foundCategory) {
        throw new BadRequestException('Category does not exist');
      }
    }

    let profile_photo: string | null = null;

    if (profile_photo_file) {
      profile_photo = await this.storageProvider.saveFile({
        filename: profile_photo_file.originalname,
        buffer: profile_photo_file.buffer,
      });
    }

    const restaurantProduct = await this.restaurantProductRepository.create({
      ..._data,
      profile_photo,
    });

    if (restaurant_product_promotion) {
      const restaurantProductPromotion =
        await this.restaurantProductPromotionRepository.create({
          ...restaurant_product_promotion,
          restaurant_product_id: restaurantProduct.id,
        });

      return {
        ...restaurantProduct,
        restaurantProductPromotions: [restaurantProductPromotion],
      };
    }

    return restaurantProduct;
  }
}
