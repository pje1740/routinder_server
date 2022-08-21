import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('github')
  async githubLogin(
    @Body() body,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    const { data } = body;
    const jwtToken = this.oauthService.githubLogin(data.code);
    response.cookie('jwtToken', jwtToken, { httpOnly: true });
    return jwtToken;
  }

  @Post('google')
  async googleLogin(
    @Body() body,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    const { data } = body;
    const jwtToken = this.oauthService.googleLogin(data.code);
    response.cookie('jwtToken', jwtToken, { httpOnly: true });
    return jwtToken;
  }
}
