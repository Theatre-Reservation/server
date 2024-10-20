import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoviesService } from './search.service';
import { Movie, SearchDocument } from './search.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let model: Model<SearchDocument>;

  // Mock data for movies
  const mockMovies = [
    {
      _id: '1',
      title: 'Movie 1',
      main_genre: 'Action',
      sub_genres: ['Thriller', 'Adventure'],
    },
    {
      _id: '2',
      title: 'Movie 2',
      main_genre: 'Drama',
      sub_genres: ['Romance', 'Family'],
    },
  ];

  // Mock Mongoose model
  const mockMovieModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    model = module.get<Model<SearchDocument>>(getModelToken(Movie.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should return an empty array if no query is provided', async () => {
      const result = await service.searchMovies('');
      expect(result).toEqual([]);
    });

    it('should return movies that match the title, main genre, or sub-genres', async () => {
      // Mock the exec function to return the mockMovies
      mockMovieModel.exec.mockResolvedValueOnce(mockMovies);

      const query = 'Action';
      const result = await service.searchMovies(query);

      expect(model.find).toHaveBeenCalledWith({
        $or: [
          { title: new RegExp(query, 'i') },
          { main_genre: new RegExp(query, 'i') },
          { sub_genres: { $in: [new RegExp(query, 'i')] } },
        ],
      });
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMovies);
    });

    it('should return an empty array if no movies match the search query', async () => {
      // Mock the exec function to return an empty array
      mockMovieModel.exec.mockResolvedValueOnce([]);

      const query = 'Nonexistent Movie';
      const result = await service.searchMovies(query);

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
