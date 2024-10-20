import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  app.use(cors({
    origin: (origin, callback) => {
      callback(null, origin);  // Allow all origins
    },
    credentials: true,  // Allow credentials
  }));

  await app.listen(8500);  // Start the HTTP server on port 8500
}

bootstrap();
