import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class GenerateReportDto {
    @IsNotEmpty()
    @IsString()
    report_type: string;

    @IsNotEmpty()
    @IsDateString()
    start: string;

    @IsNotEmpty()
    @IsDateString()
    end: string;
}
