import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  cookieParser from 'cookie-parser';


import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, 
      
    }),
  );

  app.enableCors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}


bootstrap();


//npm run migration:generate -- src/migrations/addedManyTables
//npm run migration:run