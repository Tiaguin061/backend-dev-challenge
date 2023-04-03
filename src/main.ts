import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';

function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Goomer rango Restaurants')
    .setDescription('All api routers from aplication')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({ origin: '*' }));

  const appPort = process.env.PORT || 3333;

  swaggerSetup(app);

  await app.listen(appPort);

  console.log(`App listening on port ${appPort}`);
}

bootstrap();
