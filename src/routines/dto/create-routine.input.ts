import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateRoutineInput {
  @Field(() => Int)
  @IsNumber()
  userId: User;

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
