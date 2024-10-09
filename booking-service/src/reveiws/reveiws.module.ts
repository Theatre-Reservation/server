import { Module } from '@nestjs/common';
import { ReveiwsController } from './reveiws.controller';
import { ReveiwsService } from './reveiws.service';

@Module({
  controllers: [ReveiwsController],
  providers: [ReveiwsService]
})
export class ReveiwsModule {}
