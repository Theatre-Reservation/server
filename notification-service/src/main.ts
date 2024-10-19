import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the HTTP application
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // Enable CORS to allow all origins with credentials
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, origin);  // Allow all origins
    },
    credentials: true,  // Allow credentials
  });

  await app.listen(8600);  // Start the HTTP server on port 8600
}

bootstrap();
