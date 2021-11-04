import { StickerStamp } from './entities/sticker-stamp.entity';
import { Routine } from '../routines/entities/routine.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateStickerStampInput } from './dto/create-sticker-stamp.input';
// import { UpdateStickerStampInput } from './dto/update-sticker-stamp.input';
import { Repository } from 'typeorm';

@Injectable()
export class StickerStampsService {
  constructor(
    @InjectRepository(StickerStamp)
    private StickerStampsRepository: Repository<StickerStamp>,
  ) {}

  // create(createStickerStampInput: CreateStickerStampInput) {
  //   return 'This action adds a new stickerStamp';
  // }

  findAll() {
    return this.StickerStampsRepository.find();
  }

  findOne(id: number) {
    return this.StickerStampsRepository.findOne(id);
  }

  findByMonth(id: number, after?: Date, before?: Date) {
    return this.StickerStampsRepository.createQueryBuilder('stamp')
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

  updateRoutineCompleted(id: number, isCompleted: boolean) {
    return this.StickerStampsRepository.createQueryBuilder()
      .update('stamp')
      .set({
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
      .where('id = :id', { id: id })
      .execute();
  }
  // update(id: number, updateStickerStampInput: UpdateStickerStampInput) {
  //   return `This action updates a #${id} stickerStamp`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} stickerStamp`;
  // }
}
