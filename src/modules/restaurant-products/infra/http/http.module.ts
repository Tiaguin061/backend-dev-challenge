import { CreateRestaurantProductService } from '../../services/create-restaurant-product.service';
import { DeleteUniqueRestaurantProductService } from '../../services/delete-unique-restaurant-product.service';
import { ListProductsFromRestaurantService } from '../../services/list-products-from-restaurant.service';
import { ListUniqueRestaurantProductService } from '../../services/list-unique-restaurant-product.service';
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
import { UpdateUniqueRestaurantProductService } from '../../services/update-unique-restaurant-product.service';

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
    {
      provide: ListProductsFromRestaurantService,
      useFactory: (
        restaurantRepository: RestaurantRepository,
      ): ListProductsFromRestaurantService =>
        new ListProductsFromRestaurantService(restaurantRepository),
      inject: [RestaurantRepository],
    },
    {
      provide: UpdateUniqueRestaurantProductService,
      useFactory: (
        restaurantProductRepository: RestaurantProductRepository,
        storageProvider: StorageProvider,
        restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
      ): UpdateUniqueRestaurantProductService =>
        new UpdateUniqueRestaurantProductService(
          restaurantProductRepository,
          storageProvider,
          restaurantProductPromotionRepository,
        ),
      inject: [
        RestaurantProductRepository,
        StorageProvider,
        RestaurantProductPromotionRepository,
      ],
    },
    {
      provide: ListUniqueRestaurantProductService,
      useFactory: (
        restaurantProductRepository: RestaurantProductRepository,
      ): ListUniqueRestaurantProductService =>
        new ListUniqueRestaurantProductService(restaurantProductRepository),
      inject: [RestaurantProductRepository],
    },
    {
      provide: DeleteUniqueRestaurantProductService,
      useFactory: (
        restaurantProductRepository: RestaurantProductRepository,
        storageProvider: StorageProvider,
      ): DeleteUniqueRestaurantProductService =>
        new DeleteUniqueRestaurantProductService(
          restaurantProductRepository,
          storageProvider,
        ),
      inject: [RestaurantProductRepository, StorageProvider],
    },
  ],
})
export class HttpRestaurantProductModule {}
