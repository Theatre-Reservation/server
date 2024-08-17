import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://sanjana:V79JbHLxydlGsDoo@admin.pbcjo.mongodb.net/',{
    autoCreate: true
    }),MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
