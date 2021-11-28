import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine } from '../routines/entities/routine.entity';
import { StickerStamp } from './entities/sticker-stamp.entity';
@Injectable()
export class StickerStampsService {
  constructor(
    @InjectRepository(StickerStamp)
    private StickerStampsRepository: Repository<StickerStamp>,
  ) {}

  async findAll() {
    return await this.StickerStampsRepository.find();
  }

  async findOne(id: number) {
    return await this.StickerStampsRepository.findOne(id);
  }

  async findByDate(id: number, after?: Date, before?: Date) {
    return await this.StickerStampsRepository.createQueryBuilder('stamp')
      .innerJoinAndMapOne(
        'stamp.routine',
        Routine,
        'routine',
        'stamp.routineId = routine.id',
      )
      .where('routine.userId = :userId', { userId: id })
      .andWhere('routine.startDate >= :start', { start: after })
      .andWhere('routine.startDate < :end', { end: before })
      .getMany();
  }

  async updateRoutineCompleted(id: number, isCompleted: boolean) {
    await this.StickerStampsRepository.createQueryBuilder('sticker_stamp')
      .update('sticker_stamp')
      .set({
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
      .where('id = :id', { id: id })
      .execute();
    return await this.StickerStampsRepository.findOne(id);
  }
}
