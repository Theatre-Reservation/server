import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserAuthSchema } from './user-auth.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
// 
//import config from '../config/keys';
//import { NotificationsModule } from '../../../notification-service/src/notifications/notifications.module';


@Module({
    imports: [
        ConfigModule.forRoot(), 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({ 
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            return {
              secret: config.get<string>('JWT_SECRET'),
              signOptions: {expiresIn: 3 * 24 * 60 * 60 }

            }
          }
        }),
        MongooseModule.forFeature([
          { name: UserAuth.name, schema: UserAuthSchema }
        ]),
        // NotificationsModule,
      ],
  controllers: [UserAuthController],
  providers: [UserAuthService ,
    {
      provide: 'NOTIFICATION_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'notifications_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
  exports: ['NOTIFICATION_SERVICE'], // Export for use in other modules if needed
  
})
export class UserAuthModule {}


