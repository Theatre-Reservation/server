import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // Movie payment endpoint
    @Post('movie')
    async create(@Body() transactionData: any) {
        return this.transactionService.create(transactionData);
    }

    @Get('movie')
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

    // Revenue endpoint
    @Get('revenue')
    async getRevenueByTheatre(@Query('theater') theater: string, @Query('startDate') startDate:string, @Query('endDate') endDate:string): Promise<any> {
        // Log the theater value to ensure it is what you expect
        console.log('Theatre: ', theater);

        // Remove any extra quotes or whitespace
        const cleanTheater = theater.trim().replace(/^"|"$/g, '');  // Removes surrounding quotes if present

        const transaction = await this.transactionService.getRevenueByTheatre(cleanTheater, startDate, endDate);
        console.log(transaction);
        return transaction;
    }

        // retrieve most highst revenue 4 movies by theatre on time period
    @Get('topMovies')
    async getTopMoviesByRevenue(@Query('theater') theater: string, @Query('startDate') startDate:string, @Query('endDate') endDate:string): Promise<any> {
        // Log the theater value to ensure it is what you expect
        console.log('Theatre: ', theater);

        // Remove any extra quotes or whitespace
        const cleanTheater = theater.trim().replace(/^"|"$/g, '');  // Removes surrounding quotes if present

        const transaction = await this.transactionService.getTopMoviesByRevenue(cleanTheater, startDate, endDate);
        console.log(transaction);
        return transaction;
    }

    @Get('monthly-data')
    async getMonthlyDashboardData(
            @Query('theater') theater: string,
            @Query('startDate') startDate: string,
            @Query('endDate') endDate: string
        ): Promise<any> {
        const cleanTheater = theater.trim().replace(/^"|"$/g, '');  // Removes surrounding quotes if present
        const transaction = await this.transactionService.getMonthlyDashboardData(cleanTheater, startDate, endDate);
        console.log(transaction);
        return transaction;
    }
}
