import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
export class CreateRoutineInput {
  @Field(() => Int)
  @IsNumber()
  userId: number;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field()
  @IsString()
  days: string;

  @Field(() => Int)
  @IsNumber()
  stickerId: number;
}
