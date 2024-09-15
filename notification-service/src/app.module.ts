import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';
import config from './config/keys';

@Module({
  imports: [NotificationsModule,
    MongooseModule.forRoot(config.mongoURI,{
      autoCreate: true
      }),
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
