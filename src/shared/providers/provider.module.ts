import { DiskStorageProvider } from '@root/shared/providers/storageProvider/implementations/disk-storage-provider';
import { Module } from '@nestjs/common';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';

@Module({
  providers: [
    {
      provide: StorageProvider,
      useClass: DiskStorageProvider,
    },
  ],
  exports: [StorageProvider],
})
export class ProviderModule {}
