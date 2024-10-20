import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from 'src/db/event.model';
import { CreateEventDto } from './dto/event.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('EventController', () => {
    let app: INestApplication;
    let eventService: EventService;

    const mockEvents: Event[] = [
        // {
        //     id: '1',
        //     title: 'Tech Conference',
        //     description: 'A conference about the latest in tech',
        //     date: new Date(),
        //     location: 'San Francisco',
        //     attendees: 100,
        //     price: 50,
        //     discount: 0,
        // },
        // {
        //     id: '2',
        //     title: 'Music Festival',
        //     description: 'A festival with live music and performances',
        //     date: new Date(),
        //     location: 'New York',
        //     attendees: 300,
        //     price: 80,
        //     discount: 0,
        // },
    ];

    const mockEventService = {
        getAllEvents: jest.fn().mockResolvedValue(mockEvents),
        getEventById: jest.fn().mockResolvedValue(mockEvents[0]),
        postEvent: jest.fn().mockResolvedValue(mockEvents[0]),
        updateEvent: jest.fn().mockResolvedValue(mockEvents[0]),
        deleteEvent: jest.fn().mockResolvedValue(mockEvents[0]),
        applyDiscount: jest.fn().mockResolvedValue(mockEvents[0]),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventController],
            providers: [
                {
                    provide: EventService,
                    useValue: mockEventService,
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return an array of events', () => {
        return request(app.getHttpServer())
            .get('/events')
            .expect(200)
    });

    it('should return a single event by ID', () => {
        return request(app.getHttpServer())
            .get('/events/1')
            .expect(200)
    });

    it('should create a new event', () => {
        return request(app.getHttpServer())
            .post('/events')
            .send(mockEventService)
            .expect(201)
    });

    it('should update an event by ID', () => {
        return request(app.getHttpServer())
            .put('/events/1')
            .send(mockEventService)
            .expect(200)
    });

    it('should delete an event by ID', () => {
        return request(app.getHttpServer())
            .delete('/events/1')
            .expect(200)
    });

    it('should apply a discount to an event', () => {
        const discountData = { percentage: 10, amount: 5, expiry: new Date() };
        return request(app.getHttpServer())
            .post('/events/1/apply-discount')
            .send(discountData)
            .expect(201)
    });
});
