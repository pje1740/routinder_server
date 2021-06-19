import { Test, TestingModule } from '@nestjs/testing';
import { StickersResolver } from './stickers.resolver';
import { StickersService } from './stickers.service';

describe('StickersResolver', () => {
  let resolver: StickersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickersResolver, StickersService],
    }).compile();

    resolver = module.get<StickersResolver>(StickersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
