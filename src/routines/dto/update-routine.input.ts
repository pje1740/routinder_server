import { CreateRoutineInput } from './create-routine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoutineInput extends PartialType(CreateRoutineInput) {
  @Field(() => Int)
  id: number;
}
