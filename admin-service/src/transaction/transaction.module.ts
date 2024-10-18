import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../db/moviePayment.model';
import { EventPayment, EventPaymentSchema } from '../db/eventPayment.model';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: EventPayment.name, schema: EventPaymentSchema }
        ])
    ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
