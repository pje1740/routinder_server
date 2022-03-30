import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string): Promise<string> {
    const user = await this.usersRepository.findOne(1);
    console.log(user);
    if (user) {
      const payload = { username: user.username, sub: user.id };

      return this.jwtService.sign(payload);
    }
  }
}
