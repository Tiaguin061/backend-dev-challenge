import { CreateRestaurantProductPromotionService } from '@root/modules/restaurant-product-promotion/services/create-restaurant-product-promotion.service';
import { Module } from '@nestjs/common';
import { RestaurantProductDatabaseModule } from '@root/modules/restaurant-products/infra/database/database.module';
import { RestaurantProductPromotionDatabaseModule } from '../database/database.module';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';

@Module({
  imports: [
    RestaurantProductPromotionDatabaseModule,
    RestaurantProductDatabaseModule,
  ],
  providers: [
    {
      provide: CreateRestaurantProductPromotionService,
      useFactory: (
        restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
        restaurantProductRepository: RestaurantProductRepository,
      ): CreateRestaurantProductPromotionService =>
        new CreateRestaurantProductPromotionService(
          restaurantProductPromotionRepository,
          restaurantProductRepository,
        ),
      inject: [
        RestaurantProductPromotionRepository,
        RestaurantProductRepository,
      ],
    },
  ],
})
export class HttpRestaurantProductPromotionModule {}
