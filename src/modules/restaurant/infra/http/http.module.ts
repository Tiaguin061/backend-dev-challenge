import { CreateRestaurantService } from '@root/modules/restaurant/services/create-restaurant.service';
import { DatabaseModule } from '@root/shared/infra/database/database.module';
import { DeleteUniqueRestaurantService } from '@root/modules/restaurant/services/delete-unique-restaurant.service';
import { ListRestaurantsService } from '@root/modules/restaurant/services/list-restaurants.service';
import { ListUniqueRestaurantService } from '@root/modules/restaurant/services/list-unique-restaurant.service';
import { Module } from '@nestjs/common';
import { ProviderModule } from '@root/shared/providers/provider.module';
import { RestaurantController } from '@root/modules/restaurant/infra/http/controllers/restaurant.controller';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';
import { UpdateUniqueRestaurantService } from '@root/modules/restaurant/services/update-unique-restaurant.service';

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [RestaurantController],
  providers: [
    {
      provide: CreateRestaurantService,
      useFactory: (
        restaurantRepo: RestaurantRepository,
        storageProvider: StorageProvider,
      ): CreateRestaurantService =>
        new CreateRestaurantService(restaurantRepo, storageProvider),
      inject: [RestaurantRepository, StorageProvider],
    },
    {
      provide: ListUniqueRestaurantService,
      useFactory: (
        restaurantRepo: RestaurantRepository,
      ): ListUniqueRestaurantService =>
        new ListUniqueRestaurantService(restaurantRepo),
      inject: [RestaurantRepository],
    },
    {
      provide: ListRestaurantsService,
      useFactory: (
        restaurantRepo: RestaurantRepository,
      ): ListRestaurantsService => new ListRestaurantsService(restaurantRepo),
      inject: [RestaurantRepository],
    },
    {
      provide: UpdateUniqueRestaurantService,
      useFactory: (
        restaurantRepo: RestaurantRepository,
        storageProvider: StorageProvider,
      ): UpdateUniqueRestaurantService =>
        new UpdateUniqueRestaurantService(restaurantRepo, storageProvider),
      inject: [RestaurantRepository, StorageProvider],
    },
    {
      provide: DeleteUniqueRestaurantService,
      useFactory: (
        restaurantRepo: RestaurantRepository,
        storageProvider: StorageProvider,
      ): DeleteUniqueRestaurantService =>
        new DeleteUniqueRestaurantService(restaurantRepo, storageProvider),
      inject: [RestaurantRepository, StorageProvider],
    },
  ],
})
export class HttpRestaurantModule {}
