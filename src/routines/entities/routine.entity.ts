import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';

@Entity()
@ObjectType()
export class Routine {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.routines, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => StickerStamp)
  @OneToMany(() => StickerStamp, (stickerStamps) => stickerStamps.routine, {
    cascade: true,
  })
  stickerStamps: StickerStamp;

  @Column()
  @Field()
  userId: number;

  @Column()
  @Field()
  title: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @Field()
  startDate: Date;

  @Column({ type: 'timestamp' })
  @Field()
  endDate: Date;

  @Column()
  @Field()
  days: string;

  @Column()
  @Field()
  stickerId: number;
}
