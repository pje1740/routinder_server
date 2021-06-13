import { Test, TestingModule } from '@nestjs/testing';
import { StickerStampsService } from './sticker-stamps.service';

describe('StickerStampsService', () => {
  let service: StickerStampsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickerStampsService],
    }).compile();

    service = module.get<StickerStampsService>(StickerStampsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
