import { BcryptProvider } from './hashProvider/implementations/bcrypt-provider';
import { DiskStorageProvider } from '@root/shared/providers/storageProvider/implementations/disk-storage-provider';
import { HashProvider } from './hashProvider/models/hash-provider';
import { JwtProvider } from './tokenProvider/implementations/jwt-provider';
import { Module } from '@nestjs/common';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';
import { TokenProvider } from './tokenProvider/models/token-provider';

@Module({
  providers: [
    {
      provide: StorageProvider,
      useClass: DiskStorageProvider,
    },
    {
      provide: TokenProvider,
      useClass: JwtProvider,
    },
    {
      provide: HashProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [StorageProvider, TokenProvider, HashProvider],
})
export class ProviderModule {}
