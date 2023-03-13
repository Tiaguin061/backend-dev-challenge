import { DatabaseModule } from './shared/infra/database/database.module';
import { HttpModule } from './shared/infra/http/http.module';
import { Module } from '@nestjs/common';
import { ProviderModule } from './shared/providers/provider.module';

@Module({
  imports: [DatabaseModule, HttpModule, ProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
