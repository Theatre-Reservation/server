import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './moviepayment.schema';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

    async create(transactionData: any): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(transactionData);
        return createdTransaction.save();
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionModel.find().exec();
    }
}
