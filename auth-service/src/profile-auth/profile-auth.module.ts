import { Module } from '@nestjs/common';
import { ProfileAuthController } from './profile-auth.controller';
import { ProfileAuthService } from './profile-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile-auth.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema }
    ]),
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'], // Use environment variable for RabbitMQ URL
          queue: 'notifications_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ProfileAuthController],
  providers: [ProfileAuthService],
})
export class ProfileAuthModule {}
