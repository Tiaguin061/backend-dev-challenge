import { Module } from '@nestjs/common';
import { PrismaRestaurantProductPromotionRepository } from './prisma/repositories/restaurant-product-promotion-repository';
import { RestaurantProductPromotionRepository } from '../../domain/repositories/restaurant-product-promotion-repository';

@Module({
  providers: [
    {
      provide: RestaurantProductPromotionRepository,
      useClass: PrismaRestaurantProductPromotionRepository,
    },
  ],
  exports: [RestaurantProductPromotionRepository],
})
export class RestaurantProductPromotionDatabaseModule {}
