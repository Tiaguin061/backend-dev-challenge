import { CreateRestaurantProductService } from '../../services/create-restaurant-product.service';
import { Module } from '@nestjs/common';
import { ProviderModule } from '@root/shared/providers/provider.module';
import { RestaurantDatabaseModule } from '@root/modules/restaurant/infra/database/database.module';
import { RestaurantProductController } from './controllers/restaurant-product.controller';
import { RestaurantProductDatabaseModule } from '../database/database.module';
import { RestaurantProductPromotionDatabaseModule } from '@root/modules/restaurant-product-promotion/infra/database/database.module';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '../../domain/repositories/restaurant-product-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';

@Module({
  imports: [
    RestaurantProductDatabaseModule,
    RestaurantProductPromotionDatabaseModule,
    RestaurantDatabaseModule,
    ProviderModule,
  ],
  controllers: [RestaurantProductController],
  providers: [
    {
      provide: CreateRestaurantProductService,
      useFactory: (
        restaurantProductRepository: RestaurantProductRepository,
        restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
        storageProvider: StorageProvider,
        restaurantRepository: RestaurantRepository,
      ): CreateRestaurantProductService =>
        new CreateRestaurantProductService(
          restaurantProductRepository,
          restaurantProductPromotionRepository,
          storageProvider,
          restaurantRepository,
        ),
      inject: [
        RestaurantProductRepository,
        RestaurantProductPromotionRepository,
        StorageProvider,
        RestaurantRepository,
      ],
    },
  ],
})
export class HttpRestaurantProductModule {}
