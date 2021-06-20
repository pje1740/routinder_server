import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { format } from 'date-fns';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Routine {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @OneToMany(() => StickerStamp, (stickerStamp) => stickerStamp.routineId)
  id: number;

  @Column()
  @Field()
  userId: number;

  @Column()
  @Field()
  title: string;

  @Column({
    type: 'timestamp',
    default: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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
