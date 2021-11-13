import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StickerStamp } from './entities/sticker-stamp.entity';
import { StickerStampsService } from './sticker-stamps.service';
// import { CreateStickerStampInput } from './dto/create-sticker-stamp.input';
// import { UpdateStickerStampInput } from './dto/update-sticker-stamp.input';

@Resolver(() => StickerStamp)
export class StickerStampsResolver {
  constructor(private readonly stickerStampsService: StickerStampsService) {}

  // @Mutation(() => StickerStamp)
  // createStickerStamp(@Args('createStickerStampInput') createStickerStampInput: CreateStickerStampInput) {
  //   return this.stickerStampsService.create(createStickerStampInput);
  // }

  @Query(() => [StickerStamp], { name: 'stickerStamps' })
  findAll() {
    return this.stickerStampsService.findAll();
  }

  @Query(() => StickerStamp, { name: 'stickerStamp' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stickerStampsService.findOne(id);
  }

  @Query(() => [StickerStamp], { name: 'stickerStampsByDate' })
  findByDate(
    @Args('id', { type: () => Int }) id: number,
    @Args('after', { type: () => Date }) after: Date,
    @Args('before', { type: () => Date }) before: Date,
  ) {
    return this.stickerStampsService.findByDate(id, after, before);
  }

  @Mutation(() => StickerStamp, { name: 'stickerStampsUpdateRoutine' })
  updateRoutineCompleted(
    @Args('id', { type: () => Int }) id: number,
    @Args('isCompleted', { type: () => Boolean }) isCompleted: boolean,
  ) {
    return this.stickerStampsService.updateRoutineCompleted(id, isCompleted);
  }

  // @Mutation(() => StickerStamp)
  // updateStickerStamp(@Args('updateStickerStampInput') updateStickerStampInput: UpdateStickerStampInput) {
  //   return this.stickerStampsService.update(updateStickerStampInput.id, updateStickerStampInput);
  // }

  // @Mutation(() => StickerStamp)
  // removeStickerStamp(@Args('id', { type: () => Int }) id: number) {
  //   return this.stickerStampsService.remove(id);
  // }
}
