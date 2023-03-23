import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repositories/user-repository';
import { UserRepository } from '../../domain/repositories/user-respository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserDatabaseModule {}
