import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoutinesService } from './routines.service';
import { Routine } from './entities/routine.entity';
import { CreateRoutineInput } from './dto/create-routine.input';
import { UpdateRoutineInput } from './dto/update-routine.input';

@Resolver(() => Routine)
export class RoutinesResolver {
  constructor(private readonly routinesService: RoutinesService) {}

  @Mutation(() => Routine)
  createRoutine(
    @Args('createRoutineInput') createRoutineInput: CreateRoutineInput,
  ) {
    return this.routinesService.create(createRoutineInput);
  }

  @Query(() => [Routine], { name: 'routines' })
  findAll() {
    return this.routinesService.findAll();
  }

  @Query(() => Routine, { name: 'routine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.routinesService.findOne(id);
  }

  @Mutation(() => Routine)
  updateRoutine(
    @Args('updateRoutineInput') updateRoutineInput: UpdateRoutineInput,
  ) {
    return this.routinesService.update(
      updateRoutineInput.id,
      updateRoutineInput,
    );
  }

  // @Mutation(() => Routine)
  // removeRoutine(@Args('id', { type: () => Int }) id: number) {
  //   return this.routinesService.remove(id);
  // }
}
