import { CreateRestaurantProductCategoryService } from '../../services/create-restaurant-product-category.service';
import { Module } from '@nestjs/common';
import { RestaurantDatabaseModule } from '@root/modules/restaurant/infra/database/database.module';
import { RestaurantProductCategoryController } from './controllers/restaurant-product-category.controller';
import { RestaurantProductCategoryDatabaseModule } from '../database/database.module';
import { RestaurantProductCategoryRepository } from '../../domain/repositories/restaurant-product-category-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

@Module({
  imports: [RestaurantProductCategoryDatabaseModule, RestaurantDatabaseModule],
  controllers: [RestaurantProductCategoryController],
  providers: [
    {
      provide: CreateRestaurantProductCategoryService,
      useFactory: (
        restaurantProductCategoryRepository: RestaurantProductCategoryRepository,
        restaurantRepository: RestaurantRepository,
      ): CreateRestaurantProductCategoryService =>
        new CreateRestaurantProductCategoryService(
          restaurantProductCategoryRepository,
          restaurantRepository,
        ),
      inject: [RestaurantProductCategoryRepository, RestaurantRepository],
    },
  ],
})
export class HttpRestaurantProductCategoryModule {}
