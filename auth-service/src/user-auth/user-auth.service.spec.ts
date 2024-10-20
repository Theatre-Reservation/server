import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthService } from './user-auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserAuth } from './user-auth.model';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

// Create a mock for the UserAuthModel
const mockUserAuthModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
};

describe('UserAuthService', () => {
    let service: UserAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserAuthService,
                JwtService,
                {
                    provide: getModelToken(UserAuth.name),
                    useValue: mockUserAuthModel,
                },
            ],
        }).compile();

        service = module.get<UserAuthService>(UserAuthService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    

    it('should return a user if found', async () => {
        const user = { Name: 'John', Email: 'john@example.com', Password: 'hashed_password' };
        mockUserAuthModel.findOne.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(user) });

        const result = await service.findOne({ Email: 'john@example.com' });
        expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
        mockUserAuthModel.findOne.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) });

        const result = await service.findOne({ Email: 'unknown@example.com' });
        expect(result).toBeNull();
    });

    

    
});
