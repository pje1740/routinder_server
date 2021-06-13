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

  // create(createRoutineInput: CreateRoutineInput) {
  //   return 'This action adds a new routine';
  // }

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
