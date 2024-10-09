import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BookingService } from './booking/booking.service';

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Get an instance of BookingService
  const bookingService = app.get(BookingService);

  // Set up interval to release expired seats
  setInterval(() => {
    bookingService.releaseExpiredSeats();
  }, 10 * 60 * 1000); // Run every 5 minutes

  await app.listen(3000);
}

bootstrap();
