import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './moviepayment.schema';
import { EventPayment, EventPaymentSchema } from './eventpayment.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: EventPayment.name, schema: EventPaymentSchema }
        ])
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService]
})
export class TransactionModule {}
