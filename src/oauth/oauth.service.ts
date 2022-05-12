import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const REDIRECT_URI = 'http://localhost:3000';

@Injectable()
export class OauthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async githubLogin(code: string) {
    try {
      const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      });

      const parameters: string[] = data.split('&');
      const accessTokens: string[] = parameters[0].split('=');
      const config = {
        headers: { Authorization: `token ${accessTokens[1]}` },
      };
      if (accessTokens[1]) {
        const { data } = await axios.get(GITHUB_USER_URL, config);
        const { login, email } = data; //email 비공개 설정이면 null 이다.

        const isUserExist = await this.usersService.findByUsername(login);
        if (isUserExist === undefined) {
          //회원정보 저장
          const user: User = {
            id: null,
            routines: null,
            stickerStamps: null,
            username: login,
            email,
          };
          this.usersService.save(user);
        }
        const payload = { username: login, sub: email };
        return { token: this.jwtService.sign(payload) };
      }
    } catch (e) {
      return { token: null };
    }
  }
}
