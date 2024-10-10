// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';  // Import ValidationPipe
import * as bodyParser from 'body-parser';        // Import body-parser

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);
  
  app.use(cors());

  // **Add body-parser to handle 'text/plain' as JSON**
  app.use(bodyParser.json({
    type: ['application/json', 'text/plain'], // Accept both JSON and text/plain as JSON
    limit: '10mb',                            // Optional: Adjust the payload size limit as needed
  }));

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
