import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './moviepayment.schema';
import { EventPayment, EventPaymentDocument } from './eventpayment.schema';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        @InjectModel(EventPayment.name) private eventPaymentModel: Model<EventPaymentDocument>
    ) {}

    // Movie payment creation
    async create(transactionData: any): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(transactionData);
        return createdTransaction.save();
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionModel.find().exec();
    }

    // Event payment creation
    async createEvent(transactionData: any): Promise<EventPayment> {
        const createdEventPayment = new this.eventPaymentModel(transactionData);
        return createdEventPayment.save();
    }

    async findAllEvents(): Promise<EventPayment[]> {
        return this.eventPaymentModel.find().exec();
    }
}
