import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => [Routine], { nullable: true })
  @OneToMany(() => Routine, (routine) => routine.user)
  routines: Routine[];

  @Field(() => [StickerStamp], { nullable: true })
  @OneToMany(() => StickerStamp, (stickerStamp) => stickerStamp.routine)
  stickerStamps: StickerStamp[];

  @Column()
  @Field()
  username: string;
}
