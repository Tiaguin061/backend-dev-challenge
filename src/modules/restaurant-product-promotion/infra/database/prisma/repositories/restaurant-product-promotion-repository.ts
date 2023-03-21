import {
  CreateRestaurantProductPromotionRepositoryData,
  UpdateUniqueRestaurantProductPromotionRepositoryData,
} from '@root/modules/restaurant-product-promotion/domain/repositories/types';

import { Injectable } from '@nestjs/common';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { prisma } from '@root/shared/infra/database/prisma/client';

@Injectable()
export class PrismaRestaurantProductPromotionRepository
  implements RestaurantProductPromotionRepository
{
  async create({
    description,
    promotional_price,
    restaurant_product_id,
    start_promotion_date,
    end_promotion_date,
  }: CreateRestaurantProductPromotionRepositoryData) {
    return prisma.restaurantProductPromotions.create({
      data: {
        description,
        promotional_price,
        restaurant_product_id,
        start_promotion_date,
        end_promotion_date,
      },
    });
  }

  async updateUnique({
    data,
    restaurant_product_promotion_id,
  }: UpdateUniqueRestaurantProductPromotionRepositoryData) {
    return prisma.restaurantProductPromotions.update({
      where: {
        id: restaurant_product_promotion_id,
      },
      data,
      include: {
        restaurantProduct: true,
      },
    });
  }

  async findUniqueById(restaurant_product_promocion: string) {
    return prisma.restaurantProductPromotions.findUnique({
      where: {
        id: restaurant_product_promocion,
      },
      include: {
        restaurantProduct: true,
      },
    });
  }
}
