import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserAuthSchema } from './user-auth.model';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: UserAuth.name, schema: UserAuthSchema }
        ])
      ],
  controllers: [UserAuthController],
  providers: [UserAuthService]
})
export class UserAuthModule {}


