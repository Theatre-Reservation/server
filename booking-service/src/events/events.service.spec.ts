import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsService } from './events.service';
import { Event } from './event.schema';

const mockEventModel = {
  find: jest.fn().mockReturnThis(), // This allows chaining
  findById: jest.fn(),
  limit: jest.fn().mockReturnThis(), // This allows chaining
  exec: jest.fn(),
};

describe('EventsService', () => {
  let service: EventsService;
  let model: Model<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          useValue: mockEventModel,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    model = module.get<Model<Event>>(getModelToken(Event.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMaxFiveEvents', () => {
    it('should return a maximum of five events', async () => {
      const events = [
        {
          title: 'Event 1',
          description: 'Description 1',
          poster_path: 'path/to/poster1',
          venue: 'Venue 1',
          date: '2024-10-20',
          time: '18:00',
          runtime: '120',
          ticket_price: 20,
        },
        {
          title: 'Event 2',
          description: 'Description 2',
          poster_path: 'path/to/poster2',
          venue: 'Venue 2',
          date: '2024-10-21',
          time: '20:00',
          runtime: '150',
          ticket_price: 25,
        },
      ];

      // Set up the mock for find, limit, and exec
      mockEventModel.find.mockReturnValue(mockEventModel); // This allows chaining
      mockEventModel.limit.mockReturnValue(mockEventModel); // This allows chaining
      mockEventModel.exec.mockResolvedValue(events); // Resolves to the mock events

      const result = await service.getMaxFiveEvents();

      expect(result).toEqual(events);
      expect(model.find).toHaveBeenCalled();
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(model.find().limit).toHaveBeenCalledWith(5);
      expect(model.find().limit).toHaveBeenCalledTimes(1);
      expect(model.find().exec).toHaveBeenCalledTimes(1);
    });
  });
});
