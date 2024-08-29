import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowModule } from './show/show.module';
import { ReportModule } from './report/report.module';
import { ReservationModule } from './reservation/reservation.module';
import { MovieModule } from './movie/movie.module';
import { EventModule } from './event/event.module';
import config from './config/keys';

@Module({
imports: [MongooseModule.forRoot(config.mongoURI,{
    autoCreate: true
    }), ShowModule, ReportModule, ReservationModule, MovieModule, EventModule],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
