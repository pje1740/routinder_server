import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Field(() => [Routine], { nullable: true })
  @OneToMany(() => Routine, (routine) => routine.userId, {
    cascade: true,
  })
  routines: Routine[];

  @Field(() => [StickerStamp], { nullable: true })
  @OneToMany(() => StickerStamp, (stickerStamp) => stickerStamp.routineId, {
    cascade: true,
  })
  stickerStamps: StickerStamp[];

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  oauth: string;
}
