import { CreateRoutineInput } from './create-routine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateRoutineInput extends PartialType(CreateRoutineInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
