import { Test, TestingModule } from '@nestjs/testing';
import { ShowsController } from './show.controller';
import { ShowsService } from './show.service';
import { Show } from '../db/show.model';

describe('ShowController', () => {
  let showController: ShowsController;
  let showService: ShowsService;

  // Create a mock ShowsService with Jest
  const mockShowsService = {
    getAllShows: jest.fn(),
    getShowById: jest.fn(),
    updateShow: jest.fn(),
    deleteShow: jest.fn(),
    reserveSeats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowsController],
      providers: [
        {
          provide: ShowsService,
          useValue: mockShowsService,
        },
      ],
    }).compile();

    showService = module.get<ShowsService>(ShowsService);
    showController = module.get<ShowsController>(ShowsController);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('getAllShows', () => {
    it('should return an array of shows', async () => {
      const result: Show[] = [
        {
          movie: 'The Simpsons',
          theater: 'Comedy',
          date: "2024-05-01",
          time: "19:00",
          price: 100,
          seats: [],
          reserved_seats: [],
          available_seats: 100,
          created_at: new Date(),
          updated_at: new Date(),
          temporary_reserved_seats: [],
          save: function (): Show | PromiseLike<Show> {
            throw new Error('Function not implemented.');
          }
        },
      ];

      // Mock the getAllShows method
      mockShowsService.getAllShows.mockResolvedValue(result);

      // Call the controller method
      const shows = await showController.getAllShows();

      // Assert the result
      expect(shows).toBe(result);
      expect(showService.getAllShows).toHaveBeenCalledTimes(1);
    });
  });

  describe('getShowById', () => {
    it('should return a show by ID', async () => {
      const result: Show = {
        movie: 'The Simpsons',
        theater: 'Comedy',
        date: "2024-05-01",
        time: "19:00",
        price: 100,
        seats: [],
        reserved_seats: [],
        available_seats: 100,
        created_at: new Date(),
        updated_at: new Date(),
        temporary_reserved_seats: [],
        save: function (): Show | PromiseLike<Show> {
          throw new Error('Function not implemented.');
        }
      };

      // Mock the getShowById method
      mockShowsService.getShowById.mockResolvedValue(result);

      // Call the controller method
      const show = await showController.getShowById('1');

      // Assert the result
      expect(show).toBe(result);
      expect(showService.getShowById).toHaveBeenCalledWith('1');
      expect(showService.getShowById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateShow', () => {
    it('should update a show', async () => {
      const updateShowDto = {
        movie: 'The Simpsons',
        theater: 'Comedy',
        date: "2024-05-01",
        time: "20:00",
        price: 120,
        seats: [],
        reserved_seats: [],
        available_seats: 120,
        created_at: new Date(),
        updated_at: new Date(),
        temporary_reserved_seats: [],
      };

      const updatedShow: Show = {
        ...updateShowDto,
        save: function (): Show | PromiseLike<Show> {
          throw new Error('Function not implemented.');
        }
      };

      // Mock the updateShow method
      mockShowsService.updateShow.mockResolvedValue(updatedShow);

      // Call the controller method
      const show = await showController.updateShow('1', updateShowDto);

      // Assert the result
      expect(show).toBe(updatedShow);
      expect(showService.updateShow).toHaveBeenCalledWith('1', updateShowDto);
      expect(showService.updateShow).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteShow', () => {
    it('should delete a show', async () => {
      const deleteResult = { acknowledged: true, deletedCount: 1 };

      // Mock the deleteShow method
      mockShowsService.deleteShow.mockResolvedValue(deleteResult);

      // Call the controller method
      const result = await showController.deleteShow('1');

      // Assert the result
      expect(result).toBe(deleteResult);
      expect(showService.deleteShow).toHaveBeenCalledWith('1');
      expect(showService.deleteShow).toHaveBeenCalledTimes(1);
    });
  });

 describe('reserveSeats', () => {
    it('should reserve seats for a show', async () => {
      const showId = '1';
      const seats = ['A1', 'A2', 'A3'];
      const show: Show = {
        movie: 'The Simpsons',
        theater: 'Comedy',
        date: "2024-05-01",
        time: "19:00",
        price: 100,
        seats: [],
        reserved_seats: [],
        available_seats: 100,
        created_at: new Date(),
        updated_at: new Date(),
        temporary_reserved_seats: [],
        save: function (): Show | PromiseLike<Show> {
          throw new Error('Function not implemented.');
        }
      };

      // Mock the getShowById method
      mockShowsService.getShowById.mockResolvedValue(show);

      // Call the controller method
      const result = await showController.reserveSeats(showId, seats);

      // Assert the result
      // expect(result).toBe(show);
      expect(showService.reserveSeats).toHaveBeenCalledWith(showId, seats);
      expect(showService.reserveSeats).toHaveBeenCalledTimes(1);
    });
  });
});
