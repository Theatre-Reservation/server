import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/event.dto';
import { Event, EventDocument } from 'src/db/event.model';


@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

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

}
