import { Routine } from 'src/routines/entities/routine.entity';
import { Injectable } from '@nestjs/common';
import { CreateRoutineInput } from './dto/create-routine.input';
import { UpdateRoutineInput } from './dto/update-routine.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine) private routinesRepository: Repository<Routine>,
  ) {}

  create(createRoutineInput: CreateRoutineInput): Promise<Routine> {
    const newRoutine = this.routinesRepository.create(createRoutineInput);

    return this.routinesRepository.save(newRoutine);
  }

  findAll(): Promise<Routine[]> {
    return this.routinesRepository.find();
  }

  findOne(id: number) {
    return this.routinesRepository.findOne(id);
  }

  // update(id: number, updateRoutineInput: UpdateRoutineInput) {
  //   return `This action updates a #${id} routine`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} routine`;
  // }
}
