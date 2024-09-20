import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';
import config from './config/keys';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [NotificationsModule,
    MongooseModule.forRoot(config.mongoURI,{
      autoCreate: true
      }),
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
    SearchModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
