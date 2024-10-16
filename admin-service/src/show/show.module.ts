import { Module } from '@nestjs/common';
import { ShowsController } from './show.controller';
import { ShowsService } from './show.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Show, ShowSchema } from '../db/show.model';
// import {Transaction, TransactionSchema} from '../db/moviePayment.model'
// import { Mail, MailSchema } from 'src/db/mail.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Show.name, schema: ShowSchema },
      // { name: Transaction.name, schema: TransactionSchema },
      // { name: Mail.name, schema: MailSchema }
    ])
  ],
  controllers: [ShowsController],
  providers: [ShowsService]
})
export class ShowModule {}
