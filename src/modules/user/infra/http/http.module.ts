import { Module } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-respository';
import { RegisterUserService } from '../../services/register-user.service';
import { UserDatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [UserDatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: RegisterUserService,
      useFactory: (
        userRepository: UserRepository,
      ): RegisterUserService =>
        new RegisterUserService(
          userRepository,
        ),
      inject: [UserRepository],
    },
  ],
})
export class HttpUserModule {}
