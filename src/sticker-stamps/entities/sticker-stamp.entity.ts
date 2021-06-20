import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class StickerStamp {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  userId: number;

  @Column()
  @Field()
  routineId: number;

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
