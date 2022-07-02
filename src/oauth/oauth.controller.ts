import { Body, Controller, Post } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('github')
  async githubLogin(@Body() body): Promise<{ token: string }> {
    const { data } = body;
    const jwtToken = this.oauthService.githubLogin(data.code);
    return jwtToken;
  }

  @Post('google')
  async googleLogin(@Body() body): Promise<{ token: string }> {
    const { data } = body;
    const jwtToken = this.oauthService.googleLogin(data.code);
    return jwtToken;
  }
}
