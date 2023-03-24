import { AuthenticateUserService } from '../../services/authenticate-user.service';
import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { Module } from '@nestjs/common';
import { ProviderModule } from '@root/shared/providers/provider.module';
import { RegisterUserService } from '../../services/register-user.service';
import { TokenProvider } from '@root/shared/providers/tokenProvider/models/token-provider';
import { UserController } from './controllers/user.controller';
import { UserDatabaseModule } from '../database/database.module';
import { UserRepository } from '../../domain/repositories/user-respository';

@Module({
  imports: [UserDatabaseModule, ProviderModule],
  controllers: [UserController],
  providers: [
    {
      provide: RegisterUserService,
      useFactory: (
        userRepository: UserRepository,
        hashProvider: HashProvider,
      ): RegisterUserService =>
        new RegisterUserService(userRepository, hashProvider),
      inject: [UserRepository, HashProvider],
    },
    {
      provide: AuthenticateUserService,
      useFactory: (
        userRepository: UserRepository,
        tokenProvider: TokenProvider,
        hashProvider: HashProvider,
      ): AuthenticateUserService =>
        new AuthenticateUserService(
          userRepository,
          tokenProvider,
          hashProvider,
        ),
      inject: [UserRepository, TokenProvider, HashProvider],
    },
  ],
})
export class HttpUserModule {}
