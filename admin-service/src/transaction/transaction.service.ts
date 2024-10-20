import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../db/moviePayment.model';
import { EventPayment, EventPaymentDocument } from '../db/eventPayment.model';

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

    // Retrieve all revenue by Theatre based on time period
    async getRevenueByTheatre(theatre: string, startDate: string, endDate: string): Promise<any> {

        const revenueData = await this.transactionModel.aggregate([
            {
            $match: {
                theatre: { $regex: new RegExp(theatre, 'i') },
                createdAt: {
                $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)),
                $lt: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
                }
            }
            },
            {
            $group: {
                _id: "$theatre",
                totalRevenue: { $sum: "$totalAmount" },
                totalUsers: { $sum: 1 },
                totalBookings: { $sum: { $size: "$selectedSeats" } }
            }
            }
        ]).exec();

        console.log('Revenue Data: ', revenueData);
        return revenueData;
    }

    // retrieve most highst revenue 4 movies by theatre on time period
    async getTopMoviesByRevenue(theatre: string, startDate: string, endDate: string): Promise<any> {
        const revenueData = await this.transactionModel.aggregate([
            {
            $match: {
                theatre: { $regex: new RegExp(theatre, 'i') },
                createdAt: {
                $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)),
                $lt: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
                }
            }
            },
            {
            $group: {
                _id: "$movie",
                totalRevenue: { $sum: "$totalAmount" },
                totalUsers: { $sum: 1 },
                totalBookings: { $sum: { $size: "$selectedSeats" } }
            }
            },
            {
            $sort: { totalRevenue: -1 }
            },
            {
            $limit: 4
            }
        ]).exec();

        const formattedData = revenueData.map((item) => ({
            "Movie": item._id,
            "Total Revenue": item.totalRevenue/1000,
            "Total Users": item.totalUsers,
            "Total Bookings": item.totalBookings
        }));

        console.log('Revenue Data: ', formattedData);
        return formattedData;
    }

    async getMonthlyDashboardData(theatre: string, startDate: string, endDate: string): Promise<any> {
        // Implement this method to return the data required for the monthly dashboard
        const monthlyData = await this.transactionModel.aggregate([
    {
      $match: {
        theatre: { $regex: new RegExp(theatre, 'i') },
        createdAt: {
          $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)),
          $lt: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" }, // Group by month
        totalRevenue: { $sum: "$totalAmount" },
        totalCustomers: { $sum: 1 },
        totalBookings: { $sum: { $size: "$selectedSeats" } },
        } // Collect unique movies for each month
      },
    {
      $sort: { _id: 1 }, // Sort by month (1 = ascending)
    },
  ]).exec();

  // Map the results to match the required format (Jan, Feb, etc.)
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formattedData = monthlyData.map((item) => ({
    "name": monthNames[item._id - 1], // Convert month number to name
    "Total Customers": item.totalCustomers,
    "Revenue": item.totalRevenue/1000,
    "Total Booking": item.totalBookings,
  }));

  console.log('Monthly Data:', formattedData);
  return formattedData;
    }



}
