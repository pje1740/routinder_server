import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from 'src/routines/entities/routine.entity';
import { StickerStampsModule } from 'src/sticker-stamps/sticker-stamps.module';
import { RoutinesResolver } from './routines.resolver';
import { RoutinesService } from './routines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Routine]), StickerStampsModule],
  providers: [RoutinesResolver, RoutinesService],
})
export class RoutinesModule {}
