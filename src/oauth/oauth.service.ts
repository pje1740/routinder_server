import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
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
    //access_token=~&scope=read%3Auser&token_type=bearer

    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    });
    console.log(data);
    const parameters: string[] = data.split('&');
    const accessTokens: string[] = parameters[0].split('=');
    const config = {
      headers: { Authorization: `token ${accessTokens[1]}` },
    };
    // if (accessTokens[1]) {
    //   const user = await axios.post(GITHUB_USER_URL, '', config);
    //   const { login, email } = user.data;
    //   const isUserExist = this.usersService.findByEmail(email);
    //   if (!isUserExist) {
    //     //회원정보 저장
    //     const user: User = {
    //       id: null, //auto increment 되는지 확인해야함
    //       routines: null,
    //       stickerStamps: null,
    //       username: login,
    //       email,
    //     };
    //     this.usersService.save(user);
    //   }
    //   const payload = { username: login, sub: email };
    //   return this.jwtService.sign(payload);
    // }
    // return '401 Unauthorized';
    return data;
  }
}
