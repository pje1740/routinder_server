import { User } from 'src/users/entities/user.entity';
import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Routine {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.routines)
  user: User;

  @Field(() => StickerStamp)
  @OneToMany(() => StickerStamp, (stickerStamps) => stickerStamps.routine)
  stickerStamps: StickerStamp;

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
