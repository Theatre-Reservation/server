import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from '../db/movie.model';
import { CreateMovieDto } from './dto/movie.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('MovieController', () => {
    let app: INestApplication;
    let movieService: MovieService;

    const mockMovies: Movie[] = [
        {
            title: 'Inception', language: 'English', description: 'A mind-bending thriller', main_genre: 'Sci-Fi', runtime: "148",
            sub_genres: [],
            poster_path: '',
            cover_path: '',
            released_date: undefined
        },
        {
            title: 'The Matrix', language: 'English', description: 'A hacker discovers reality is a simulation', main_genre: 'Sci-Fi', runtime: "136",
            sub_genres: [],
            poster_path: '',
            cover_path: '',
            released_date: undefined
        },
    ];

    const mockMovieService = {
        getAllMovies: jest.fn().mockResolvedValue(mockMovies),
        getMovieById: jest.fn().mockResolvedValue(mockMovies[0]),
        postMovie: jest.fn().mockResolvedValue(mockMovies[0]),
        updateMovie: jest.fn().mockResolvedValue(mockMovies[0]),
        deleteMovie: jest.fn().mockResolvedValue(mockMovies[0]),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [
                {
                    provide: MovieService,
                    useValue: mockMovieService,
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return an array of movies', () => {
        return request(app.getHttpServer())
            .get('/movies')
            .expect(200)
    });

    it('should return a single movie by ID', () => {
        return request(app.getHttpServer())
            .get('/movies/1')
            .expect(200)
    });

    it('should create a new movie', () => {
        const newMovie: CreateMovieDto = {
            title: 'Interstellar',
            language: '',
            description: '',
            main_genre: '',
            runtime: 0
        };
        return request(app.getHttpServer())
            .post('/movies')
            .send(newMovie)
            .expect(201)
    });

    it('should update a movie by ID', () => {
        const updatedMovie: CreateMovieDto = {
            title: 'Inception Updated',
            language: '',
            description: '',
            main_genre: '',
            runtime: 0
        };
        return request(app.getHttpServer())
            .put('/movies/1')
            .send(updatedMovie)
            .expect(200)
    });

    it('should delete a movie by ID', () => {
        return request(app.getHttpServer())
            .delete('/movies/1')
            .expect(200)
    });
});
