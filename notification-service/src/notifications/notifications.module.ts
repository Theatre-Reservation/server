import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose'; 
import { Notifications, NotificationsSchema} from './notifications.model'; 
import { NotificationsGateway } from './notifications.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name: Notifications.name, schema: NotificationsSchema }
    ]),
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // Replace with your RabbitMQ URL
          queue: 'notifications_queue',
          queueOptions: {
            durable: true, // Ensures messages are stored even if RabbitMQ restarts
          },
        },
      },
    ]),
  ],
  providers: [NotificationsService, NotificationsGateway],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
