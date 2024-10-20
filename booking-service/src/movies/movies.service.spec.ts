import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { MoviesService } from './movies.service';
import { Model } from 'mongoose';

describe('MoviesService', () => {
  let service: MoviesService;
  let model: any;

  const mockMovieModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    distinct: jest.fn(),
  };

  const mockMovies = [
    {
      _id: '1',
      title: 'Movie 1',
      main_genre: 'Action',

      description: 'Description 1',
      duration: 120,
      director: 'Director 1',
      actors: ['Actor 1', 'Actor 2'],
      release_date: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      _id: '2',
      title: 'Movie 2',
      main_genre: 'Comedy',
      description: 'Description 2',
      duration: 90,
      director: 'Director 2',
      actors: ['Actor 3', 'Actor 4'],
      release_date: new Date('2021-02-01T00:00:00.000Z'),
    },
  ];

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
    model = module.get<Model<Movie>>(getModelToken(Movie.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      mockMovieModel.exec.mockResolvedValue(mockMovies);

      const result = await service.getAllMovies();

      expect(result).toEqual(mockMovies);
      expect(model.find).toHaveBeenCalled();
      expect(model.find).toHaveBeenCalledTimes(1);
      expect(model.find().exec).toHaveBeenCalled();
      expect(model.find().exec).toHaveBeenCalledTimes(1);
    });
  });

describe('getMovieById', () => {
  it('should return a movie by ID', async () => {
    const movie = mockMovies[0];

    // Mocking findById and its exec() method correctly
    mockMovieModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(movie),
    });

    // Call the service method
    const result = await service.getMovieById('1');

    // Assertions
    expect(mockMovieModel.findById).toHaveBeenCalledWith('1');
    expect(mockMovieModel.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(movie); // result should match the mock movie
  });
});



describe('getMovieByTitle', () => {
  it('should return a movie by title', async () => {
    const movie = mockMovies[0];

    // Mocking findOne and its exec() method correctly
    mockMovieModel.findOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(movie),
    });

    // Call the service method
    const result = await service.getMovieByTitle('Movie 1');

    // Assertions
    expect(result).toEqual(movie); // The result should match the mock movie
    expect(mockMovieModel.findOne).toHaveBeenCalledWith({ title: 'Movie 1' });
    expect(mockMovieModel.findOne).toHaveBeenCalledTimes(1); // Ensures findOne was called once
  });
});


describe('getMoviesByMainGenre', () => {
  it('should return movies by main genre', async () => {
    const movies = [mockMovies[0]]; // This is the mocked data you expect to receive
    // Mocking the find method to return an object with an exec method
    mockMovieModel.find.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(movies), // Mocking exec to resolve with the movies array
    });

    const result = await service.getMoviesByMainGenre('Action');

    // Assertions
    expect(result).toEqual(movies); // Check that the result matches the mocked movies
    expect(mockMovieModel.find).toHaveBeenCalledWith({ main_genre: 'Action' }); // Check that find was called with the correct argument
    expect(mockMovieModel.find).toHaveBeenCalledTimes(1); // Ensure find was called once
  });
});

describe('getFiveMoviesFromDifferentGenres', () => {
    it('should return five movies from different genres', async () => {
      const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
      const movies = mockMovies.slice(0, 5); // Assuming you have 5 mock movies

      model.distinct.mockReturnValue({
        exec: jest.fn().mockResolvedValue(genres),
      });

      model.findOne.mockImplementation((query) => {
        const genre = query.main_genre;
        return {
          exec: jest.fn().mockResolvedValueOnce(
            movies.find(movie => movie.main_genre === genre)
          ),
        };
      });

      model.find.mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]), // Mock as needed
        }),
      });

      const result = await service.getFiveMoviesFromDifferentGenres();

      expect(result).toEqual(movies); // Ensure the result matches the expected movies
      expect(model.distinct).toHaveBeenCalledWith('main_genre');
      expect(model.distinct).toHaveBeenCalledTimes(1);
      expect(model.findOne).toHaveBeenCalledTimes(genres.length); // Should call once for each genre
      genres.forEach((genre, index) => {
        expect(model.findOne).toHaveBeenCalledWith({ main_genre: genre });
      });
    });
  });
});