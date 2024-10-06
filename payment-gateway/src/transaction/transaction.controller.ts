import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // Movie payment endpoint
    @Post()
    async create(@Body() transactionData: any) {
        return this.transactionService.create(transactionData);
    }

    @Get()
    async findAll() {
        return this.transactionService.findAll();
    }

    // Event payment endpoint
    @Post('event')
    async createEvent(@Body() transactionData: any) {
        return this.transactionService.createEvent(transactionData);
    }

    @Get('event')
    async findAllEvents() {
        return this.transactionService.findAllEvents();
    }
}
