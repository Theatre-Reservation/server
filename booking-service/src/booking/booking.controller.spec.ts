import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Show } from './show.schema';

describe('BookingController', () => {
  let app: INestApplication;
  let bookingService: BookingService;

  const mockShows: Show[] = [
    // { movieTitle: 'Inception', theaterName: 'CinemaX', price: 10, date: '2023-10-01', reservedSeats: [], temporaryReservedSeats: [] },
    // { movieTitle: 'The Matrix', theaterName: 'CinemaY', price: 12, date: '2023-10-05', reservedSeats: [], temporaryReservedSeats: [] }
  ];

  const mockBookingService = {
    getShowsByMovieTitle: jest.fn().mockResolvedValue(mockShows),
    getShowsByTheaterName: jest.fn().mockResolvedValue(mockShows),
    getShowsByPrice: jest.fn().mockResolvedValue(mockShows),
    getShowsWithMaxPriceByMovie: jest.fn().mockResolvedValue(mockShows),
    getShowsByMovieAndDate: jest.fn().mockResolvedValue(mockShows),
    getShowById: jest.fn().mockResolvedValue(mockShows[0]),
    updateSeats: jest.fn().mockResolvedValue(mockShows[0]),
    lockSeats: jest.fn().mockResolvedValue(mockShows[0]),
    releaseSpecificSeats: jest.fn().mockResolvedValue(mockShows[0]),
    releaseSeats: jest.fn().mockResolvedValue({ message: 'Seats released successfully.' }),
    getLoyaltyPoints: jest.fn().mockResolvedValue({ loyaltyPoints: 100 }),
    updateLoyaltyPoints: jest.fn().mockResolvedValue({ loyaltyPoints: 150 }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return shows by movie title', () => {
    return request(app.getHttpServer())
      .get('/booking/by-movie?movieTitle=Inception')
      .expect(200)
  });

  it('should return shows by theater name', () => {
    return request(app.getHttpServer())
      .get('/booking/by-theater?theaterName=CinemaX&movieTitle=Inception')
      .expect(200)
  });

  it('should return shows by price', () => {
    return request(app.getHttpServer())
      .get('/booking/by-price?maxPrice=15')
      .expect(200)
  });

  it('should return shows by movie and max price', () => {
    return request(app.getHttpServer())
      .get('/booking/by-movie-max-price?movieTitle=Inception')
      .expect(200)
  });

  it('should return shows by movie and date', () => {
    return request(app.getHttpServer())
      .get('/booking/by-movie-date?movieTitle=Inception&date=2023-10-01')
      .expect(200)
  });

  it('should return a single show by ID', () => {
    return request(app.getHttpServer())
      .get('/booking/single/1')
      .expect(200)
  });

  it('should update seats for a show', () => {
    const reservedSeats = ['A1', 'A2'];
    return request(app.getHttpServer())
      .patch('/booking/update-seats/1')
      .send({ reservedSeats })
      .expect(200)
  });

  it('should lock seats for a show', () => {
    const temporaryReservedSeats = ['B1', 'B2'];
    return request(app.getHttpServer())
      .patch('/booking/lock-seats/1')
      .send({ temporaryReservedSeats })
      .expect(200)
  });

  it('should release specific seats for a show', () => {
    const seatsToRelease = ['A1', 'A2'];
    return request(app.getHttpServer())
      .patch('/booking/release-seats/1')
      .send({ seatsToRelease })
      .expect(200)
  });

  it('should release seats for a show', () => {
    const seatsToRelease = ['A1', 'A2'];
    return request(app.getHttpServer())
      .post('/booking/release-seats')
      .send({ showId: '1', seatsToRelease })
      .expect(201)
      .expect({ message: 'Seats released successfully.' });
  });

  it('should return loyalty points for a user', () => {
    return request(app.getHttpServer())
      .get('/booking/loyalty-points/1')
      .expect(200)
      .expect({ loyaltyPoints: { loyaltyPoints: 100 } });
  });

  it('should update loyalty points for a user', () => {
    const points = 50;
    return request(app.getHttpServer())
      .patch('/booking/loyalty-points/1')
      .send({ points })
      .expect(200)
      .expect({ message: 'Loyalty points updated successfully. New balance: ${updatedUser.loyaltyPoints} points.',
      newBalance: 150 });
  });
});
