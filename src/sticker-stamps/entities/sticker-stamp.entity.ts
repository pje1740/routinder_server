import { Routine } from 'src/routines/entities/routine.entity';
import { User } from 'src/users/entities/user.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class StickerStamp {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.stickerStamps)
  user: User;

  @Field(() => Routine)
  @ManyToOne(() => Routine, (routine) => routine.stickerStamps)
  routine: Routine;

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
