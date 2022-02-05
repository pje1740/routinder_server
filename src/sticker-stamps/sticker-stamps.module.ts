import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StickerStamp } from './entities/sticker-stamp.entity';
import { StickerStampsResolver } from './sticker-stamps.resolver';
import { StickerStampsService } from './sticker-stamps.service';

@Module({
  imports: [TypeOrmModule.forFeature([StickerStamp])],
  providers: [StickerStampsResolver, StickerStampsService],
  exports: [StickerStampsService],
})
export class StickerStampsModule {}
