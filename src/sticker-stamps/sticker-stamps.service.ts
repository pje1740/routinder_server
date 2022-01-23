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

  //days '0123456' '1, 3, 5'
  //daysToNum = [0 일,1 월,2 화,3 수,4 목,5 금,6 토] [1, 3, 6] 오늘이 4 목요일일 때 일단 토
  //interval = [2, 2, 2]
  countInterval(today: number, days: string) {
    const standard = [0, 1, 2, 3, 4, 5, 6];
    const daysToNum = [];
    const interval = [];
    for (let i = 0; i < days.length; i++) {
      daysToNum.push(+days[i]);
    }
    //[1, 3, 5, 6]이고 오늘이 4라고 치면 strtIdx는 2겠지?
    let strtIdx = 0;
    while (strtIdx < daysToNum.length) {
      if (today < daysToNum[strtIdx]) {
        interval.push(daysToNum[strtIdx] - today);
        break;
      }
      strtIdx++;
    }
    // daysToNum = [1, 3, 6]; 이게 지금 토탈 토요일부터 월요일까지 이틀이지 [1, 3, 5] 면 금욜부터 월욜까지 삼일
    const lstToZero = Math.abs(daysToNum[daysToNum.length - 1] - 6) + 1;
    const zeroToStrt = standard.findIndex((elem) => elem === daysToNum[0]); // 1

    interval.push(lstToZero + zeroToStrt);
    for (let i = 1; i < daysToNum.length - 1; i++) {
      interval.push(daysToNum[i] - daysToNum[i - 1]);
    }

    return interval;
  }

  async create(routine: Routine) {
    //startDate 랑 endDate로 일자계산해서 [{ userId: 1, routineId: 1, when: 2021-02-01 00:00:00 }, ..]
    const { userId, id, startDate, endDate, days } = { ...routine };
    let startTim = startDate.getTime();
    const endTim = endDate.getTime();
    const stampsInfo = [];

    const today = startDate.getDay();
    const standard = [0, 1, 2, 3, 4, 5, 6];
    const daysToNum = [];
    const interval = [];
    for (let i = 0; i < days.length; i++) {
      daysToNum.push(+days[i]);
    }
    //[1, 3, 5, 6]이고 오늘이 4라고 치면 strtIdx는 2겠지?
    let strtIdx = 0;
    while (strtIdx < daysToNum.length) {
      if (today < daysToNum[strtIdx]) {
        interval.push(daysToNum[strtIdx] - today);
        break;
      }
      strtIdx++;
    }

    for (let i = 1; i < daysToNum.length; i++) {
      interval.push(daysToNum[i] - daysToNum[i - 1]);
    }
    // daysToNum = [1, 3, 6]; 이게 지금 토탈 토요일부터 월요일까지 이틀이지 [1, 3, 5] 면 금욜부터 월욜까지 삼일
    const lstToZero = Math.abs(daysToNum[daysToNum.length - 1] - 6) + 1;
    const zeroToStrt = standard.findIndex((elem) => elem === daysToNum[0]);
    interval.push(lstToZero + zeroToStrt);

    //days 만큼 생성해야되네;
    startTim += 1000 * 60 * 60 * 24 * interval[0];
    const stampInfo = {
      userId,
      routineId: id,
      when: new Date(startTim),
    };
    stampsInfo.push(stampInfo);
    interval.shift();

    //strtIdx 가 interval.length 이면 0으로 다시 초기화시켜
    while (startTim < endTim) {
      if (strtIdx === interval.length) {
        strtIdx = 0;
      }
      startTim += 1000 * 60 * 60 * 24 * interval[strtIdx];
      const startDate = new Date(startTim);
      const stampInfo = {
        userId,
        routineId: id,
        when: startDate,
      };
      stampsInfo.push(stampInfo);
      strtIdx++;
    }
    console.log(userId, id);
    console.log(stampsInfo);
    await this.StickerStampsRepository.createQueryBuilder()
      .insert()
      .into('sticker_stamp')
      .values(stampsInfo)
      .execute();
    // const result = await this.StickerStampsRepository.query(
    //   `INSERT INTO sticker_stamp (userId, routineId, when) VALUES ('2', '36', '2022-01-23 19:09:39');`,
    // );
    // console.log(result);
    console.log('StickerStamps Successfully created');
  }
}
