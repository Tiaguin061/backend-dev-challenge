import { CreateRestaurantService } from 'src/modules/restaurant/services/create-restaurant.service';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { ProviderModule } from 'src/shared/providers/provider.module';
import { RestaurantController } from 'src/modules/restaurant/infra/http/controllers/create-restaurant.controller';
import { RestaurantRepository } from 'src/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from 'src/shared/providers/storageProvider/models/storage-provider';

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
  ],
})
export class HttpModule {}
