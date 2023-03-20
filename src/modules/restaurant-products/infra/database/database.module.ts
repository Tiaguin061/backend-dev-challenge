import { Module } from '@nestjs/common';
import { PrismaRestaurantProductRepository } from './prisma/repositories/restaurant-product-repository';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';

@Module({
  imports: [],
  providers: [
    {
      provide: RestaurantProductRepository,
      useClass: PrismaRestaurantProductRepository,
    },
  ],
  exports: [RestaurantProductRepository],
})
export class RestaurantProductDatabaseModule {}
