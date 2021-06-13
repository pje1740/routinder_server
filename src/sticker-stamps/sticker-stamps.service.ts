import { StickerStamp } from './entities/sticker-stamp.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStickerStampInput } from './dto/create-sticker-stamp.input';
import { UpdateStickerStampInput } from './dto/update-sticker-stamp.input';
import { Repository } from 'typeorm';

@Injectable()
export class StickerStampsService {
  constructor(
    @InjectRepository(StickerStamp)
    private StickerStampsRepository: Repository<StickerStamp>,
  ) {}

  // create(createStickerStampInput: CreateStickerStampInput) {
  //   return 'This action adds a new stickerStamp';
  // }

  findAll() {
    return this.StickerStampsRepository.find();
  }

  findOne(id: number) {
    return this.StickerStampsRepository.findOne(id);
  }

  // update(id: number, updateStickerStampInput: UpdateStickerStampInput) {
  //   return `This action updates a #${id} stickerStamp`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} stickerStamp`;
  // }
}
