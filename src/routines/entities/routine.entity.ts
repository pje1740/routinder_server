import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';
import { Sticker } from './../../stickers/entities/sticker.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
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
  @OneToMany(() => StickerStamp, (stickerStamp) => stickerStamp.routineId)
  id: number;

  @Column()
  @Field()
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Column()
  @Field()
  title: string;

  @Column({ type: 'timestamp' })
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
  @ManyToOne(() => Sticker, (sticker) => sticker.id)
  stickerId: number;
}
