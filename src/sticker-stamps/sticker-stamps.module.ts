import { StickerStamp } from './entities/sticker-stamp.entity';
import { Module } from '@nestjs/common';
import { StickerStampsService } from './sticker-stamps.service';
import { StickerStampsResolver } from './sticker-stamps.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StickerStamp])],
  providers: [StickerStampsResolver, StickerStampsService],
})
export class StickerStampsModule {}
