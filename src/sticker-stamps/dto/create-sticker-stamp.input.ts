import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStickerStampInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
