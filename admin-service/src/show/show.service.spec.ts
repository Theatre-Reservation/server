import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Show } from '../db/show.model';
import { ShowsService } from './show.service';
import { Model } from 'mongoose';
import { MovieGateway } from '../movie/movie.gateway'; 
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ShowsService', () => {
  let service: ShowsService;
  let model: Model<Show>;

  const mockShowModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    findById: jest.fn(),
  };

  const mockShows = [
    {
      _id: '1',
      title: 'Show 1',
      theater: 'Theater 1',
      movie: 'Movie 1',
      price: 100,
      seats: [[0, 1], [1, 0]],
      created_at: new Date('2021-02-01T00:00:00.000Z'),
    },
    {
      _id: '2',
      title: 'Show 2',
      theater: 'Theater 2',
      movie: 'Movie 2',
      price: 150,
      seats: [[1, 1], [0, 0]],
      created_at: new Date('2021-11-01T00:00:00.000Z'),
    },
  ];

  // Mock MovieGateway
  const mockMovieGateway = {
    notifyShowDiscount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowsService,
        {
          provide: getModelToken(Show.name),
          useValue: mockShowModel,
        },
        {
          provide: MovieGateway,
          useValue: mockMovieGateway, // Use the mock MovieGateway
        },
      ],
    }).compile();

    service = module.get<ShowsService>(ShowsService);
    model = module.get<Model<Show>>(getModelToken(Show.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllShows', () => {
    it('should return all shows', async () => {
        mockShowModel.exec.mockResolvedValueOnce(mockShows);

        const result = await service.getAllShows();

        expect(model.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockShows);
    });
    
  });

    describe('getShowById', () => {
        it('should return a show by ID', async () => {
            mockShowModel.findById.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockShows[0]),
            });

            const result = await service.getShowById('1');

            expect(model.findById).toHaveBeenCalledTimes(1);
            expect(model.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockShows[0]);
        });

        it('should throw a NotFoundException if the show is not found', async () => {
            mockShowModel.findById.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(null),
            });

            await expect(service.getShowById('1')).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('getShowByTheatre', () => {
        it('should return shows by theatre', async () => {
            mockShowModel.find.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockShows),
            });

            const result = await service.getShowByTheatre('Theater 1', '2021-01-01', '2021-12-31');

            expect(model.find).toHaveBeenCalledTimes(1);
            expect(model.find).toHaveBeenCalledWith({
                theater: 'Theater 1',
                created_at: {
                $gte: new Date('2021-01-01T00:00:00.000Z'),
                $lte: new Date('2021-12-31T23:59:59.999Z'),
                },
            });
            expect(result).toEqual(mockShows);
        });

        it('should throw a NotFoundException if no shows are found', async () => {
            mockShowModel.find.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce([]),
            });

            await expect(service.getShowByTheatre('Theater 1', '2021-05-01', '2021-12-31')).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('applyDiscount', () => {
        it('should apply a discount (percsntage) to a show till expiry date', async () => {
            mockShowModel.findById.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockShows[0]),
            });

            const result = await service.applyDiscount('1', { percentage: 10, expiry: new Date('2025-01-01') });

            expect(model.findById).toHaveBeenCalledTimes(1);
            expect(model.findById).toHaveBeenCalledWith('1');
            // expect(mockShows[0].price).toEqual(100);
            expect(result.price).toEqual(90);
        });

        it('should apply a discount (amount) to a show till expiry date', async () => {
            mockShowModel.findById.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockShows[0]),
            });

            const result = await service.applyDiscount('1', { amount: 20, expiry: new Date('2025-01-01') });

            expect(model.findById).toHaveBeenCalledTimes(1);
            expect(model.findById).toHaveBeenCalledWith('1');
            // expect(mockShows[0].price).toEqual(100);
            expect(result.price).toEqual(70);
        });

        it ('should throw a BadRequestException if the discount has expired', async () => {
            mockShowModel.findById.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(mockShows[0]),
            });

            await expect(service.applyDiscount('1', { percentage: 10, expiry: new Date('2021-01-01') })).rejects.toThrow(
                BadRequestException,
            );
        });


        it('should throw a NotFoundException if the show is not found', async () => {
            mockShowModel.findById.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValueOnce(null),
            });

            await expect(service.applyDiscount('1', { percentage: 10, expiry: new Date('2021-01-01') })).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
