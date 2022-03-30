import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy';

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
  providers: [AuthService, AuthResolver, JwtStrategy], //이부분들 역시도 인증과 관련된 부분을 구현하기위해서 필요한 파일입니다.
  exports: [],
})
export class AuthModule {}
