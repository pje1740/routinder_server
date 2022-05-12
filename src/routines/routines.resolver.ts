import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth-guard.service';
import { CreateRoutineInput } from './dto/create-routine.input';
import { UpdateRoutineInput } from './dto/update-routine.input';
import { Routine } from './entities/routine.entity';
import { RoutinesService } from './routines.service';

@Resolver(() => Routine)
export class RoutinesResolver {
  constructor(private readonly routinesService: RoutinesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Routine)
  createRoutine(
    @Args('createRoutineInput') createRoutineInput: CreateRoutineInput,
  ) {
    return this.routinesService.create(createRoutineInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Routine], { name: 'routines' })
  findAll() {
    return this.routinesService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Routine, { name: 'routine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.routinesService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Routine)
  updateRoutine(
    @Args('updateRoutineInput') updateRoutineInput: UpdateRoutineInput,
  ) {
    return this.routinesService.update(
      updateRoutineInput.id,
      updateRoutineInput,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Routine)
  removeRoutine(@Args('id', { type: () => Int }) id: number) {
    return this.routinesService.remove(id);
  }
}
