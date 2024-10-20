import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/event.dto';
import { Event, EventDocument } from 'src/db/event.model';
import { MovieGateway } from '../movie/movie.gateway';


@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private eventGateway: MovieGateway,) {}

    async getAllEvents(): Promise<Event[]> {
        return this.eventModel.find().exec();
    }

    async getEventById(id: string): Promise<Event> {
        const event = await this.eventModel.findById(id).exec();
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }

    async postEvent(createEventDto: CreateEventDto): Promise<Event> {
        const createdEvent = new this.eventModel(createEventDto);
        return createdEvent.save();
    }

    async updateEvent(id: string, createEventDto: CreateEventDto): Promise<Event> {
        const updatedEvent = await this.eventModel.findByIdAndUpdate(id, createEventDto, {
            new: true,
        }).exec();
        if (!updatedEvent) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return updatedEvent;
    }

    async deleteEvent(id: string): Promise<Event> {
        const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
        if (!deletedEvent) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return deletedEvent;
    }

    async applyDiscount(showId: string, discountData: { percentage?: number; amount?: number; expiry?: Date }): Promise<Event> {
    const show: EventDocument = await this.eventModel.findById(showId).exec();
    if (!show) {
        throw new NotFoundException(`Show with ID ${showId} not found`);
    }

    // Check if the discount is expired
    console.log(discountData.expiry < new Date())
        // Check if the discount expiry date is provided
    if (discountData.expiry) {
        const expiryDate = new Date(discountData.expiry); // Convert expiry to Date object
        const currentDate = new Date(); // Get the current date

        // Check if the expiry date is in the past
        if (expiryDate < currentDate) {
            console.log("The discount has expired.");
            throw new BadRequestException(`Cannot apply discount; current discount has expired.`);
        }
    }
    console.log("percentage", discountData.percentage);

    let discountPrice = 0;
    if (discountData.percentage) {
            show.discountPercentage = discountData.percentage;
            show.discountAmount = undefined; // Clear fixed discount if percentage is applied
            discountPrice = show.ticket_price * (discountData.percentage / 100);
            console.log("discountPrice", discountPrice);
            show.ticket_price = show.ticket_price - discountPrice;
    } else if (discountData.amount) {
            show.discountAmount = discountData.amount;
            show.discountPercentage = undefined; // Clear percentage discount if fixed amount is applied
            discountPrice = discountData.amount;
            show.ticket_price = show.ticket_price - discountPrice;
    } else {
        throw new BadRequestException('Discount amount or percentage must be provided');
    }

        // Set the discount expiry date if provided
    if (discountData.expiry) {
        show.discountExpiry = new Date(discountData.expiry); // Ensure it's a Date object
    } else {
        show.discountExpiry = undefined; // Clear expiry if not provided
    }
    this.eventGateway.notifyEventDiscount(show);
    console.log(show)
        return show;
    } catch (error) {
        console.error('Error applying discount:', error); // Log the error for debugging
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error; // Rethrow known exceptions
        } else {
            throw new InternalServerErrorException('Failed to apply discount');
        }
  }

}
