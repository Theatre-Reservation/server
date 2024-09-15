// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Search , SearchDocument } from './search.model';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Search.name) private itemModel: Model<SearchDocument>) {}

  async search(query: string) {

    if (!query) {
      // If no query is provided, return an empty array
      return [];
    }
    
    // Define a list of keywords to ignore
    const keywordsToIgnore = ['name', 'description'];

    // Split the query into individual words
    const words = query.split(' ').filter(word => word.trim().length > 0 && !keywordsToIgnore.includes(word.toLowerCase()));
    
    if (words.length === 0) {
      // If all words are filtered out, return an empty array
      return [];
    }

    // Create a regex array to search for each word in the name or description fields
    const regexArray = words.map(word => ({
      $or: [
        { name: { $regex: word, $options: 'i' } },  //case insensitive search in name
        { description: { $regex: word, $options: 'i' } }   //case insensitive search in description
      ]
    }));

    // Perform the search with the constructed regex array
    return this.itemModel.find({
      $or: regexArray
    }).exec();









   
  }
}
