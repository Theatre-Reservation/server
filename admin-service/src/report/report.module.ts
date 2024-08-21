import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './report.model';
import { ReservationSchema } from './reservation.model';
import { PaymentSchema } from './payment.model';

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
