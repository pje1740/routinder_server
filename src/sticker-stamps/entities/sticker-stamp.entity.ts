import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Routine } from 'src/routines/entities/routine.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class StickerStamp {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.stickerStamps, { onDelete: 'CASCADE' })
  userId: User;

  @JoinColumn({ name: 'routineId' })
  @Field(() => Routine)
  @ManyToOne(() => Routine, (routine) => routine.stickerStamps, {
    onDelete: 'CASCADE',
  })
  routineId: Routine;

  @Column({ default: false })
  @Field()
  isCompleted: boolean;

  @Column({ type: 'timestamp' })
  @Field()
  when: Date;

  @Column({ type: 'timestamp', default: null })
  @Field({ nullable: true })
  completedAt: Date;
}
