import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventSearchService } from './event_search.service';
import { Event, EventDocument } from './event_search.model';

describe('EventSearchService', () => {
  let service: EventSearchService;
  let model: Model<EventDocument>;

  // Mock data for events
  const mockEvents = [
    {
      _id: '1',
      title: 'Event 1',
      main_genre: 'Action',
      sub_genres: ['Thriller', 'Adventure'],
    },
    {
      _id: '2',
      title: 'Event 2',
      main_genre: 'Drama',
      sub_genres: ['Romance', 'Family'],
    },
  ];

  // Mock Mongoose model
  const mockEventModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSearchService,
        {
          provide: getModelToken(Event.name),
          useValue: mockEventModel,
        },
      ],
    }).compile();

    service = module.get<EventSearchService>(EventSearchService);
    model = module.get<Model<EventDocument>>(getModelToken(Event.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchEvents', () => {
    it('should return an empty array if no query is provided', async () => {
      const result = await service.searchEvents('');
      expect(result).toEqual([]);
    });

    it('should return events that match the title, main genre, or sub-genres', async () => {
      // Mock the exec function to return the mockEvents
      mockEventModel.exec.mockResolvedValueOnce(mockEvents);

      const query = 'Action';
      const result = await service.searchEvents(query);

      expect(model.find).toHaveBeenCalledWith({
        $or: [
          { title: new RegExp(query, 'i') },
          { main_genre: new RegExp(query, 'i') },
          { sub_genres: { $in: [new RegExp(query, 'i')] } },
        ],
      });
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEvents);
    });

    it('should return an empty array if no events match the search query', async () => {
      // Mock the exec function to return an empty array
      mockEventModel.exec.mockResolvedValueOnce([]);

      const query = 'Nonexistent Event';
      const result = await service.searchEvents(query);

      expect(model.find).toHaveBeenCalledWith({
        $or: [
          { title: new RegExp(query, 'i') },
          { main_genre: new RegExp(query, 'i') },
          { sub_genres: { $in: [new RegExp(query, 'i')] } },
        ],
      });
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });
});
