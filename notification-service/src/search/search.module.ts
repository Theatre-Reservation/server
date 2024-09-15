import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Search , SearchSchema } from './search.model';

@Module({ 
  imports : [
    MongooseModule.forFeature([
      { name: Search.name, schema: SearchSchema }
    ])
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
