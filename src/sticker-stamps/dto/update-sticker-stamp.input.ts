import { CreateStickerStampInput } from './create-sticker-stamp.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStickerStampInput extends PartialType(
  CreateStickerStampInput,
) {
  @Field(() => Int)
  id: number;
}
