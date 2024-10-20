import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getModelToken } from '@nestjs/mongoose';
import { Transaction } from './moviepayment.schema';
import { EventPayment } from './eventpayment.schema';

// Mock Transaction and EventPayment models
const mockTransactionModel = {
  save: jest.fn(),
  find: jest.fn(),
  exec: jest.fn(),
};

const mockEventPaymentModel = {
  save: jest.fn(),
  find: jest.fn(),
  exec: jest.fn(),
};

describe('TransactionService (Integration)', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: {
            ...mockTransactionModel,
            constructor: jest.fn().mockImplementation((data) => ({
              ...data,
              save: mockTransactionModel.save,
            })),
          },
        },
        {
          provide: getModelToken(EventPayment.name),
          useValue: {
            ...mockEventPaymentModel,
            constructor: jest.fn().mockImplementation((data) => ({
              ...data,
              save: mockEventPaymentModel.save,
            })),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

 

  // Test for fetching all movie transactions
  it('should return all movie transactions', async () => {
    const transactions = [
      { movieTitle: 'Movie 1', amount: 100 },
      { movieTitle: 'Movie 2', amount: 150 },
    ];

    // Mock the find method to return the transactions
    mockTransactionModel.find.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(transactions),
    });

    const result = await service.findAll();
    expect(result).toEqual(transactions);
    expect(mockTransactionModel.find).toHaveBeenCalled();
  });

 

  // Test for fetching all event transactions
  it('should return all event payment transactions', async () => {
    const eventPayments = [
      { eventName: 'Event 1', amount: 200 },
      { eventName: 'Event 2', amount: 250 },
    ];

    // Mock the find method to return the event payments
    mockEventPaymentModel.find.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(eventPayments),
    });

    const result = await service.findAllEvents();
    expect(result).toEqual(eventPayments);
    expect(mockEventPaymentModel.find).toHaveBeenCalled();
  });
});
