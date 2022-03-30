import { Body, Controller, Post } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('github')
  async githubLogin(@Body() code: string): Promise<string> {
    const jwtToken = this.oauthService.githubLogin(code);
    return jwtToken;
  }
}
