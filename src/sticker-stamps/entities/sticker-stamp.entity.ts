import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Routine } from 'src/routines/entities/routine.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class StickerStamp {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Column()
  @Field()
  @ManyToOne(() => Routine, (routine) => routine.id)
  routineId: string;

  @Column()
  @Field()
  isCompleted: boolean;

  @Column({ type: 'timestamp' })
  @Field()
  when: Date;

  @Column({ type: 'timestamp' })
  @Field()
  completedAt: Date;
}
