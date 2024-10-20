import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../db/moviePayment.model';
import { getModelToken } from '@nestjs/mongoose';
import { EventPayment, EventPaymentDocument } from '../db/eventPayment.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionModel: Model<TransactionDocument>;
  let eventPaymentModel: Model<EventPaymentDocument>;

  const mockTransactionModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    create: jest.fn(),
    aggregate: jest.fn(),
  };

  const mockEventPaymentModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  const mockTransactions = [
    {
      _id: '1',
      movie: 'Movie 1',
      theater: 'Theater 1',
      user: 'User 1',
      totalAmount: 100,
      selectedSeats: ['A1', 'A2'],
      createdAt: new Date('2021-02-01T00:00:00.000Z'),
    },
    {
      _id: '2',
      movie: 'Movie 2',
      theater: 'Theater 2',
      user: 'User 2',
      totalAmount: 150,
      selectedSeats: ['B1', 'B2', 'B3'],
      createdAt: new Date('2021-11-01T00:00:00.000Z'),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
        {
          provide: getModelToken(EventPayment.name),
          useValue: mockEventPaymentModel,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    transactionModel = module.get<Model<TransactionDocument>>(getModelToken(Transaction.name));
    eventPaymentModel = module.get<Model<EventPaymentDocument>>(getModelToken(EventPayment.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  

  describe('findAll', () => {
    it('should return all transactions', async () => {
      mockTransactionModel.exec.mockResolvedValue(mockTransactions);

      const transactions = await service.findAll();

      expect(transactions).toEqual(mockTransactions);
      expect(mockTransactionModel.find).toHaveBeenCalled();
      expect(mockTransactionModel.exec).toHaveBeenCalled();
    });
  });

  describe('findAllEvents', () => {
    it('should return all event payments', async () => {
      const mockEvents = [{ eventName: 'Event 1', user: 'User 1', amount: 200 }];
      mockEventPaymentModel.exec.mockResolvedValue(mockEvents);

      const events = await service.findAllEvents();

      expect(events).toEqual(mockEvents);
      expect(mockEventPaymentModel.find).toHaveBeenCalled();
      expect(mockEventPaymentModel.exec).toHaveBeenCalled();
    });
  });
  
});
