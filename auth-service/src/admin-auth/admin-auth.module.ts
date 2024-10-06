import { Module } from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuth, AdminAuthSchema } from './admin-auth.model';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: AdminAuth.name, schema: AdminAuthSchema }
        ])
      ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService]
})
export class AdminAuthModule {}


