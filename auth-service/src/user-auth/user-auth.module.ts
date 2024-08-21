import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserAuthSchema } from './user-auth.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 
import config from '../config/keys';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({ 
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            return {
              secret: config.get<string>('JWT_SECRET'),
              // signOptions: { expiresIn: config.get<string | number >('JWT_EXPIRE') }
              signOptions: {expiresIn: 3 * 24 * 60 * 60 }

            }
          }
        }),
             // Load ConfigModule globally
    // ConfigModule.forRoot({
    //   load: [() => config.JWT_EXPIRE, () => config.JWT_SECRET], // Load the configuration from keys.ts
    //   isGlobal: true, // Make the configuration available across the application
    // }),
        MongooseModule.forFeature([
          { name: UserAuth.name, schema: UserAuthSchema }
        ])
      ],
  controllers: [UserAuthController],
  providers: [UserAuthService]
})
export class UserAuthModule {}


