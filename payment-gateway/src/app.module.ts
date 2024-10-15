import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://sanjana:V79JbHLxydlGsDoo@admin.pbcjo.mongodb.net/',{
    autoCreate: true
    }),StripeModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
