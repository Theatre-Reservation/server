import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the HTTP application
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  
  // Connect the RabbitMQ microservice to the same app
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'], // Ensure RabbitMQ port is correct
  //     queue: 'notifications_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // Start both HTTP server and the microservice
  //await app.startAllMicroservices(); // Start the microservice
  await app.listen(8600); // Start the HTTP server on port 8500

}
bootstrap();
