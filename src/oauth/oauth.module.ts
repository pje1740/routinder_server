import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/JwtStrategy';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '1 day' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [OauthController],
  providers: [OauthService, UsersService, JwtStrategy],
})
export class OauthModule {}
