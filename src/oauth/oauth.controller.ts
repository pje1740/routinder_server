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
  ): Promise<string> {
    const { data } = body;
    const { token } = await this.oauthService.githubLogin(data.code);
    response.cookie('jwtToken', token, { httpOnly: true });
    return token;
  }

  @Post('google')
  async googleLogin(
    @Body() body,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const { data } = body;
    const { token } = await this.oauthService.googleLogin(data.code);
    response.cookie('jwtToken', token, { httpOnly: true });
    return token;
  }
}
