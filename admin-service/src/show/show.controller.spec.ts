import { Test, TestingModule } from '@nestjs/testing';
import { ShowsController } from './show.controller';
import { ShowsService } from './show.service';

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

});
