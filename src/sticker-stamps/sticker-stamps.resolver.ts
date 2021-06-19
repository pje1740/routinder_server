import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StickerStampsService } from './sticker-stamps.service';
import { StickerStamp } from './entities/sticker-stamp.entity';
import { CreateStickerStampInput } from './dto/create-sticker-stamp.input';
import { UpdateStickerStampInput } from './dto/update-sticker-stamp.input';

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

  // @Mutation(() => StickerStamp)
  // updateStickerStamp(@Args('updateStickerStampInput') updateStickerStampInput: UpdateStickerStampInput) {
  //   return this.stickerStampsService.update(updateStickerStampInput.id, updateStickerStampInput);
  // }

  // @Mutation(() => StickerStamp)
  // removeStickerStamp(@Args('id', { type: () => Int }) id: number) {
  //   return this.stickerStampsService.remove(id);
  // }
}
