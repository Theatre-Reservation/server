import { Test, TestingModule } from '@nestjs/testing';
import { EventSearchService } from './event_search.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event_search.model';

describe('EventSearchService', () => {
  let service: EventSearchService;
  let model: Model<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSearchService,
        {
          provide: getModelToken(Event.name),
          useValue: {
            find: jest.fn() // Mock the find method
          }
        }
      ]
    }).compile();

    service = module.get<EventSearchService>(EventSearchService);
    model = module.get<Model<Event>>(getModelToken(Event.name));
  });

  it('should return an array of events matching the search query', async () => {
    const query = 'action';
    const expectedResult = [
      { title: 'Action Movie', main_genre: 'Action', sub_genres: [] }
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(expectedResult)
    } as any);

    const result = await service.searchEvents(query);
    expect(result).toEqual(expectedResult);
    expect(model.find).toHaveBeenCalledWith({
      $or: [
        { title: new RegExp(query, 'i') },
        { main_genre: new RegExp(query, 'i') },
        { sub_genres: { $in: [new RegExp(query, 'i')] } }
      ]
    });
  });

  it('should return an empty array if query is empty', async () => {
    const result = await service.searchEvents('');
    expect(result).toEqual([]);
    expect(model.find).not.toHaveBeenCalled();
  });
});
