import { Test, TestingModule } from '@nestjs/testing';
import { ReveiwsController } from './reveiws.controller';

describe('ReveiwsController', () => {
  let controller: ReveiwsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReveiwsController],
    }).compile();

    controller = module.get<ReveiwsController>(ReveiwsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
