import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthService } from './user-auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserAuth } from './user-auth.model';

// Mock UserAuthModel and JwtService
const mockUserAuthModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  save: jest.fn(),
};

const mockJwtService = {
  verifyAsync: jest.fn(),
};

describe('UserAuthService (Integration)', () => {
  let service: UserAuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthService,
        {
          provide: getModelToken(UserAuth.name),
          useValue: mockUserAuthModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UserAuthService>(UserAuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should fetch all users', async () => {
    const users = [
      { Name: 'John', Email: 'john@example.com', Password: 'hashed_password' },
      { Name: 'Jane', Email: 'jane@example.com', Password: 'hashed_password2' },
    ];

    mockUserAuthModel.find.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(users),
    });

    const result = await service.all();
    expect(result).toEqual(users);
    expect(mockUserAuthModel.find).toHaveBeenCalled();
  });

  

  it('should update a user by ID', async () => {
    const userId = 'someUserId';
    const updateData = { Name: 'John Updated' };
    const updatedUser = { _id: userId, ...updateData, Email: 'john@example.com', Password: 'hashed_password' };

    // Mock the findByIdAndUpdate method to return the updated user
    mockUserAuthModel.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(updatedUser),
    });

    const result = await service.update(userId, updateData);
    expect(result).toEqual(updatedUser);
    expect(mockUserAuthModel.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateData, { new: true });
  });

  it('should verify JWT token and return a user', async () => {
    const token = 'someValidToken';
    const decodedToken = { id: 'userId' };
    const user = { _id: 'userId', Name: 'John', Email: 'john@example.com' };

    // Mock the jwtService to return decoded token
    mockJwtService.verifyAsync.mockResolvedValueOnce(decodedToken);

    // Mock the findById method to return a user
    mockUserAuthModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(user),
    });

    const result = await service.getUserFromToken(token);
    expect(result).toEqual(user);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token);
    expect(mockUserAuthModel.findById).toHaveBeenCalledWith(decodedToken.id);
  });

  

  it('should return null if no user is found with provided condition', async () => {
    mockUserAuthModel.findOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    const result = await service.findOne({ Email: 'nonexistent@example.com' });
    expect(result).toBeNull();
    expect(mockUserAuthModel.findOne).toHaveBeenCalledWith({ Email: 'nonexistent@example.com' });
  });
});
