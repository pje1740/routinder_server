import { Sticker } from './entities/sticker.entity';
import { Module } from '@nestjs/common';
import { StickersService } from './stickers.service';
import { StickersResolver } from './stickers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker])],
  providers: [StickersResolver, StickersService],
})
export class StickersModule {}
