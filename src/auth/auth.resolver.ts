import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';

export interface Context {
  user?: any;
}
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  async login(@Args('data') data: AuthInput) {
    try {
      const { email } = data;
      const token = this.authService.login(email);

      return token;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
