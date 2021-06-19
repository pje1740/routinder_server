import { Test, TestingModule } from '@nestjs/testing';
import { StickerStampsResolver } from './sticker-stamps.resolver';
import { StickerStampsService } from './sticker-stamps.service';

describe('StickerStampsResolver', () => {
  let resolver: StickerStampsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickerStampsResolver, StickerStampsService],
    }).compile();

    resolver = module.get<StickerStampsResolver>(StickerStampsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
