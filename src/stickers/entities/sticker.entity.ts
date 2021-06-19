import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Sticker {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @OneToMany(() => Routine, (routine) => routine.stickerId)
  id: number;

  @Column()
  @Field()
  name: string;
}
