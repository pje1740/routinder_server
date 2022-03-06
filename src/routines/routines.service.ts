import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from 'src/routines/entities/routine.entity';
import { Repository } from 'typeorm';
import { StickerStampsService } from '../sticker-stamps/sticker-stamps.service';
import { CreateRoutineInput } from './dto/create-routine.input';
import { UpdateRoutineInput } from './dto/update-routine.input';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine) private routinesRepository: Repository<Routine>,
    private stickerStampsService: StickerStampsService,
  ) {}

  validateDate(routine: Routine) {
    if (
      routine.startDate.getTime() + 1000 * 60 * 10 < new Date().getTime() ||
      routine.startDate.getTime() >
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365
    )
      return new Error('Invalid StartDate');
    if (
      routine.endDate.getTime() <
        routine.startDate.getTime() + 1000 * 60 * 60 * 24 * 7 ||
      routine.endDate.getTime() >
        routine.startDate.getTime() + 1000 * 60 * 60 * 24 * 90
    )
      return new Error('Invalid EndDate');
    const regExp = /^[0]{0,1}[1]{0,1}[2]{0,1}[3]{0,1}[4]{0,1}[5]{0,1}[6]{0,1}$/;
    if (!routine.days || !routine.days.match(regExp))
      return new Error('Invalid Days');
  }

  async create(createRoutineInput: CreateRoutineInput): Promise<Routine> {
    const newRoutine = this.routinesRepository.create(createRoutineInput);
    if (this.validateDate(newRoutine) instanceof Error)
      throw new Error(this.validateDate(newRoutine).message);
    const savedRoutine = await this.routinesRepository.save(newRoutine);
    this.stickerStampsService.create(savedRoutine);
    return savedRoutine;
  }

  findAll(): Promise<Routine[]> {
    return this.routinesRepository.find();
  }

  findOne(id: number) {
    return this.routinesRepository.findOne(id, {
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateRoutineInput: UpdateRoutineInput,
  ): Promise<Routine> {
    let routine = await this.findOne(id);
    routine = { ...routine, ...updateRoutineInput };
    if (this.validateDate(routine) instanceof Error)
      throw new Error(this.validateDate(routine).message);
    const savedRoutine = await this.routinesRepository.save(routine);
    this.stickerStampsService.update(savedRoutine);
    return this.routinesRepository.findOne(id);
  }

  async remove(id: number) {
    const routine = await this.routinesRepository.findOne(id);
    if (routine === undefined) return new Error('Routine does not exist');
    const data = { ...routine };
    await this.routinesRepository.remove(routine);
    return data;
  }
}
