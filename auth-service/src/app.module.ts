import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import config from './config/keys';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(config.mongoURI,{
    autoCreate: true
    }), 

    UserAuthModule, AdminAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
