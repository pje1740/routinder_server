import { Routine } from 'src/routines/entities/routine.entity';
import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesResolver } from './routines.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Routine])],
  providers: [RoutinesResolver, RoutinesService],
})
export class RoutinesModule {}
