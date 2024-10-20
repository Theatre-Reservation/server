import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './search.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './search.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let model: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: {
            find: jest.fn() // Mock the find method
          }
        }
      ]
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    model = module.get<Model<Movie>>(getModelToken(Movie.name));
  });

  it('should return an array of movies matching the search query', async () => {
    const query = 'comedy';
    const expectedResult = [
      { title: 'Comedy Movie', main_genre: 'Comedy', sub_genres: [] }
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(expectedResult)
    } as any);

    const result = await service.searchMovies(query);
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
    const result = await service.searchMovies('');
    expect(result).toEqual([]);
    expect(model.find).not.toHaveBeenCalled();
  });
});
