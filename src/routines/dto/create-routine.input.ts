import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoutineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
