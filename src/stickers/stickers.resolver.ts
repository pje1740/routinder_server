import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { StickersService } from './stickers.service';
import { Sticker } from './entities/sticker.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth-guard.service';
@Resolver(() => Sticker)
export class StickersResolver {
  constructor(private readonly stickersService: StickersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Sticker], { name: 'stickers' })
  findAll() {
    return this.stickersService.findAll();
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => Sticker, { name: 'sticker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stickersService.findOne(id);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Sticker], { name: 'stickersByDate' })
  findByDate(
    @Args('id', { type: () => Int }) id: number,
    @Args('after', { type: () => Date }) after: Date,
    @Args('before', { type: () => Date }) before: Date,
  ) {
    return this.stickersService.findByDate(id, after, before);
  }
}
