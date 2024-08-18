import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI,{
    autoCreate: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
