import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose'; 
import { Notifications, NotificationsSchema} from './notifications.model'; 
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name: Notifications.name, schema: NotificationsSchema }
    ])
  ],
  providers: [NotificationsService, NotificationsGateway],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
