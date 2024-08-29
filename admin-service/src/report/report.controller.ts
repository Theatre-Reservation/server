import { Controller, Get, Query, BadRequestException, Body, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { GenerateReportDto } from './dto/genarateReport.dto';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    // check if the date string is in valid format
    private parseDate(dateStr: string): Date {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        throw new BadRequestException(`Invalid date format: ${dateStr}`);
    }
    return new Date(date.setHours(0, 0, 0, 0)); // Set time to midnight
}

    private getEndOfDay(dateStr: string): Date {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        throw new BadRequestException(`Invalid date format: ${dateStr}`);
    }
    return new Date(date.setHours(23, 59, 59, 999)); // Set time to end of day
}


    // Endpoint to generate a sales report
    @Get('sales')
    async generateSalesReport(
        @Query('start') start: string, @Query('end') end: string) {
        const timePeriod = {
            start: this.parseDate(start),
            end: this.parseDate(end)
        };
        return this.reportService.generateSalesReport(timePeriod);
    }

    // Endpoint to generate a revenue report
    @Get('revenue')
    async generateRevenueReport(@Query('start') start: string, @Query('end') end: string) {
        const timePeriod = {
            start: this.parseDate(start),
            end: this.parseDate(end)
        };
        // console.log(start, end);
        return this.reportService.generateRevenueReport(timePeriod);
    }

    // Endpoint to generate a popular shows report
    @Get('popular-shows')
    async generatePopularShowsReport(@Query('start') start: string, @Query('end') end: string) {
        const timePeriod = {
            start: this.parseDate(start),
            end: this.parseDate(end)
        };
        return this.reportService.generatePopularShowsReport(timePeriod);
    }

    // Endpoint to generate a report based on the report type
    // @Post('generate')
    // async generateReport(@Body() generateReportDto: GenerateReportDto) {
    //     const { report_type, start, end } = generateReportDto;

    //     const timePeriod = {
    //         start: this.parseDate(start),
    //         end: this.parseDate(end),
    //     };

    //     // Call the appropriate service method based on report type
    //     switch (report_type) {
    //         case 'sales':
    //             return this.reportService.generateSalesReport(timePeriod);
    //         case 'revenue':
    //             return this.reportService.generateRevenueReport(timePeriod);
    //         case 'popular-shows':
    //             return this.reportService.generatePopularShowsReport(timePeriod);
    //         default:
    //             throw new BadRequestException('Invalid report type');
    //     }
    // }
}
