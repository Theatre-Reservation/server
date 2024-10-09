import { Test, TestingModule } from '@nestjs/testing';
import { ReveiwsService } from './reveiws.service';

describe('ReveiwsService', () => {
  let service: ReveiwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReveiwsService],
    }).compile();

    service = module.get<ReveiwsService>(ReveiwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
