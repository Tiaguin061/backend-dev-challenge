import { Module } from '@nestjs/common';
import { PrismaRestaurantProductCategoryRepository } from './prisma/repositories/restaurant-product-category-repository';
import { RestaurantProductCategoryRepository } from '../../domain/repositories/restaurant-product-category-repository';

@Module({
  providers: [
    {
      provide: RestaurantProductCategoryRepository,
      useClass: PrismaRestaurantProductCategoryRepository,
    },
  ],
  exports: [RestaurantProductCategoryRepository],
})
export class RestaurantProductCategoryDatabaseModule {}
