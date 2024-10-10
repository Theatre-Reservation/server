import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './movie_search/search.module';
import config from './config/keys';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailModule } from './mail/mail.module';

import { EventSearchModule } from './event_search/event_search.module';

@Module({
  imports: [NotificationsModule,
    MongooseModule.forRoot(config.mongoURI,{
      autoCreate: true
      }),
    SearchModule,
    MailModule,
    EventSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
