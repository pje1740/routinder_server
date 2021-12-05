import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoutineInput } from './dto/create-routine.input';
import { UpdateRoutineInput } from './dto/update-routine.input';
import { Routine } from './entities/routine.entity';
import { RoutinesService } from './routines.service';

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

  @Mutation(() => Routine)
  removeRoutine(@Args('id', { type: () => Int }) id: number) {
    return this.routinesService.remove(id);
  }
}
