import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from '../db/report.model';
import { ReservationSchema } from '../db/reservation.model';
import { PaymentSchema } from '../db/payment.model';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: 'Reservation', schema: ReservationSchema },
      { name: 'Payment', schema: PaymentSchema }
    ])
  ],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
