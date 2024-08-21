import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from './report.model';
import { Model } from 'mongoose';
import { ReservationDocument } from './reservation.model'; // Assuming you have this model defined
import { PaymentDocument } from './payment.model'; // Assuming you have this model defined

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
        @InjectModel('Reservation') private readonly reservationModel: Model<ReservationDocument>,
        @InjectModel('Payment') private readonly paymentModel: Model<PaymentDocument>,
    ) {}

    // Generate sales report
    async generateSalesReport(timePeriod: { start: Date; end: Date }) {
        const salesData = await this.reservationModel.aggregate([
            {
                $match: {
                    reservation_date: { $gte: timePeriod.start, $lte: timePeriod.end },
                    status: 'confirmed'
                }
            },
            {
                $group: {
                    _id: null,
                    totalReservations: { $sum: 1 },
                    totalSales: { $sum: "$total_price" }
                }
            }
        ]);

        const report = new this.reportModel({
            report_id: 'sales_' + new Date().getTime(),
            report_type: 'Sales Report',
            time_period: timePeriod,
            data: salesData,
            generated_at: new Date()
        });

        return report.save();
    }

    // Generate revenue report
    async generateRevenueReport(timePeriod: { start: Date; end: Date }) {
        const revenueData = await this.paymentModel.aggregate([
            {
                $match: {
                    payment_date: { $gte: timePeriod.start, $lte: timePeriod.end },
                    status: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]);

        const report = new this.reportModel({
            report_id: 'revenue_' + new Date().getTime(),
            report_type: 'Revenue Report',
            time_period: timePeriod,
            data: revenueData,
            generated_at: new Date()
        });

        return report.save();
    }

    // Generate popular shows report
    async generatePopularShowsReport(timePeriod: { start: Date; end: Date }) {
        const popularShowsData = await this.reservationModel.aggregate([
            {
                $match: {
                    reservation_date: { $gte: timePeriod.start, $lte: timePeriod.end },
                    status: 'confirmed'
                }
            },
            {
                $group: {
                    _id: "$show_id",
                    reservationsCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'shows', // Assuming your shows collection is named 'shows'
                    localField: '_id',
                    foreignField: '_id',
                    as: 'showDetails'
                }
            },
            {
                $unwind: "$showDetails"
            },
            {
                $project: {
                    showTitle: "$showDetails.title",
                    reservationsCount: 1
                }
            },
            {
                $sort: { reservationsCount: -1 } // Sort by popularity
            }
        ]);

        const report = new this.reportModel({
            report_id: 'popular_shows_' + new Date().getTime(),
            report_type: 'Popular Shows Report',
            time_period: timePeriod,
            data: popularShowsData,
            generated_at: new Date()
        });

        return report.save();
    }
}
