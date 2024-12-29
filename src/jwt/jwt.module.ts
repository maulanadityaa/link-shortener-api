import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtAuthModule {}
