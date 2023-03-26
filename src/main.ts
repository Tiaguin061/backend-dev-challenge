import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useNestTreblle } from 'treblle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressInstance = app.getHttpAdapter().getInstance();

  if (process.env.NODE_ENV !== 'production') {
    // Generate automatically docs on treblle application
    useNestTreblle(expressInstance, {
      apiKey: 'gRLqFMxQ4anu3ANK1kwm6Md3rzgmpuZR',
      projectId: 'Aq1Ahdu8sfphUzUK',
    });
  }

  await app.listen(3333);
}
bootstrap();
