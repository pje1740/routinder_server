import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateStickerStampInput } from './dto/create-sticker-stamp.input';
// import { UpdateStickerStampInput } from './dto/update-sticker-stamp.input';
import { Repository } from 'typeorm';
import { Routine } from '../routines/entities/routine.entity';
import { StickerStamp } from './entities/sticker-stamp.entity';
@Injectable()
export class StickerStampsService {
  constructor(
    @InjectRepository(StickerStamp)
    private StickerStampsRepository: Repository<StickerStamp>,
  ) {}

  // create(createStickerStampInput: CreateStickerStampInput) {
  //   return 'This action adds a new stickerStamp';
  // }

  test(id: number) {
    if (id === 1) {
      throw new Error();
    } else {
      return this.StickerStampsRepository.find();
    }
  }

  findAll() {
    return this.StickerStampsRepository.find();
  }

  findOne(id: number) {
    return this.StickerStampsRepository.findOne(id);
  }

  findByDate(id: number, after?: Date, before?: Date) {
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
    try {
      this.StickerStampsRepository.createQueryBuilder('sticker_stamp')
        .update('sticker_stamp')
        .set({
          isCompleted: isCompleted,
          completedAt: isCompleted ? new Date() : null,
        })
        .where('id = :id', { id: id })
        .execute();
      return this.StickerStampsRepository.findOne(id);
    } catch (err) {
      console.error(err);
      return 'execution failed';
    }
  }
  // update(id: number, updateStickerStampInput: UpdateStickerStampInput) {
  //   return `This action updates a #${id} stickerStamp`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} stickerStamp`;
  // }
}
