import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async getMaxFiveEvents(): Promise<Event[]> {
    return this.eventModel.find().limit(5).exec();
  }

  async getEventById(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec();
  }
}
