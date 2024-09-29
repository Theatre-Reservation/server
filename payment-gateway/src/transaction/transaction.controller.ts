import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async create(@Body() transactionData: any) {
        return this.transactionService.create(transactionData);
    }

    @Get()
    async findAll() {
        return this.transactionService.findAll();
    }
}
