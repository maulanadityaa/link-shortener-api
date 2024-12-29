import { HttpException, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateToken(userInfo: any): Promise<string> {
    const payload = {
      userId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    };

    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
