import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { StickersService } from './stickers.service';
import { Sticker } from './entities/sticker.entity';
// import { isThisISOWeek } from 'date-fns';
// import { CreateStickerInput } from './dto/create-sticker.input';
// import { UpdateStickerInput } from './dto/update-sticker.input';

@Resolver(() => Sticker)
export class StickersResolver {
  constructor(private readonly stickersService: StickersService) {}

  // @Mutation(() => Sticker)
  // createSticker(@Args('createStickerInput') createStickerInput: CreateStickerInput) {
  //   return this.stickersService.create(createStickerInput);
  // }

  @Query(() => [Sticker], { name: 'stickers' })
  findAll() {
    return this.stickersService.findAll();
  }

  @Query(() => Sticker, { name: 'sticker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stickersService.findOne(id);
  }

  @Query(() => [Sticker], { name: 'stickers' })
  findByMonth(
    @Args('id', { type: () => Int }) id: number,
    @Args('after', { type: () => Date }) after: Date,
    @Args('before', { type: () => Date }) before: Date,
  ) {
    return this.stickersService.findByMonth(id, after, before);
  }
  // @Mutation(() => Sticker)
  // updateSticker(@Args('updateStickerInput') updateStickerInput: UpdateStickerInput) {
  //   return this.stickersService.update(updateStickerInput.id, updateStickerInput);
  // }

  // @Mutation(() => Sticker)
  // removeSticker(@Args('id', { type: () => Int }) id: number) {
  //   return this.stickersService.remove(id);
  // }
}
