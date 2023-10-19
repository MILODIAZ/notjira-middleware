import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService) {}

  generateJWT(user: any) {
    const payload = { user };
    if (user.error) {
      return user;
    }
    return {
      access_token: this.JwtService.sign(payload),
      user,
    };
  }
}
