import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event , EventDocument} from './event_search.model';
@Injectable()
export class EventSearchService {
    constructor(
        @InjectModel(Event.name) private readonly movieModel: Model<EventDocument>
      ) {}
    
      // Method to search movies based on a query
      async searchEvents(query: string): Promise<Event[]> {
        console.log(query,"Query")
        if (!query) {
          return [];
        }
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
        return this.movieModel.find({
          $or: [
            { title: searchRegex },
            { main_genre: searchRegex },
            { sub_genres: { $in: [searchRegex] } }
          ]
        }).exec();
      }
}
