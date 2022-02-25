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
      .andWhere('stamp.when >= :start', { start: after })
      .andWhere('stamp.when <= :end', { end: before })
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

  daysToStickerStamp(routine: Routine) {
    const { user, id, startDate, endDate, days } = { ...routine };
    let startTim = startDate.getTime();
    const endTim = endDate.getTime();
    const stampsInfo = [];

    const today = startDate.getDay();
    const standard = [0, 1, 2, 3, 4, 5, 6]; //[0 일,1 월,2 화,3 수,4 목,5 금,6 토]
    const daysToNum = []; //루틴 요일
    const interval = []; //일자 간격
    for (let i = 0; i < days.length; i++) {
      daysToNum.push(+days[i]);
    }

    //1. startDate와 가장 가까운 요일을 찾아 차이를 계산해 interval에 삽입, strtIdx 값 세팅
    let strtIdx = 0;
    while (strtIdx < daysToNum.length) {
      // 1) 오늘이 루틴 요일보다 큰 경우 ex. [1, 3, 5] 인데 오늘이 6인 경우
      if (today > Math.max.apply(null, daysToNum)) {
        const lstToZero = Math.abs(today - 6) + 1;
        const zeroToStrt = standard.findIndex((elem) => elem === daysToNum[0]);
        interval.push(lstToZero + zeroToStrt);
        break;
      }
      // 2) 오늘이 루틴 중간에 껴있는 경우 ex. [1, 3, 5]인데 오늘이 4인 경우
      if (today < daysToNum[strtIdx]) {
        interval.push(daysToNum[strtIdx] - today);
        break;
      }
      // 3) 오늘이 루틴날인 경우 ex. [1, 3, 5]인데 오늘이 3인 경우
      else if (today === daysToNum[strtIdx]) {
        interval.push(0);
        break;
      }
      strtIdx++;
    }

    //2. interval에 요일 간격 일자를 삽입
    for (let i = 1; i < daysToNum.length; i++) {
      interval.push(daysToNum[i] - daysToNum[i - 1]);
    }

    //3. 루틴의 마지막 요일과 시작 요일의 차이를 계산해 interval에 삽입
    const lstToZero = Math.abs(daysToNum[daysToNum.length - 1] - 6) + 1;
    const zeroToStrt = standard.findIndex((elem) => elem === daysToNum[0]);
    interval.push(lstToZero + zeroToStrt);

    //4. 시작날짜 세팅해주고 첫 인덱스는 삭제
    startTim += 1000 * 60 * 60 * 24 * interval[0];
    const stampInfo = {
      userId: user.id,
      routineId: id,
      when: new Date(startTim),
    };
    stampsInfo.push(stampInfo);
    interval.shift();

    //5. 일자간격 더해주면서 스티커스탬프 생성, strtIdx 가 interval.length 이면 0으로 초기화
    while (startTim < endTim) {
      if (strtIdx === interval.length) {
        strtIdx = 0;
      }
      startTim += 1000 * 60 * 60 * 24 * interval[strtIdx];
      const startDate = new Date(startTim);
      const stampInfo = {
        userId: user.id,
        routineId: id,
        when: startDate,
      };
      stampsInfo.push(stampInfo);
      strtIdx++;
    }
    console.log(stampsInfo);
    return stampsInfo;
  }

  async create(routine: Routine) {
    const stampsInfo = this.daysToStickerStamp(routine);

    await this.StickerStampsRepository.createQueryBuilder()
      .insert()
      .into('sticker_stamp')
      .values(stampsInfo)
      .execute();

    console.log('StickerStamps Successfully created');
  }

  async update(routine: Routine) {
    const { id } = { ...routine };
    const stampsInfo = this.daysToStickerStamp(routine);
    await this.StickerStampsRepository.createQueryBuilder()
      .delete()
      .from('sticker_stamp')
      .where('routineId = :routineId', { routineId: id })
      .execute();
    await this.StickerStampsRepository.createQueryBuilder()
      .insert()
      .into('sticker_stamp')
      .values(stampsInfo)
      .execute();

    console.log('StickerStamps Successfully updated');
  }
}
