import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlAuthGuard } from './auth/gql-auth-guard.service';
import { RoutinesModule } from './routines/routines.module';
import { StickerStampsModule } from './sticker-stamps/sticker-stamps.module';
import { StickersModule } from './stickers/stickers.module';
import { UsersModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, connection }) => {
        if (req) {
          const user = req.headers.authorization;
          return { ...req, user };
        } else {
          return connection;
        }
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    RoutinesModule,
    StickersModule,
    StickerStampsModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService, GqlAuthGuard],
})
export class AppModule {}
