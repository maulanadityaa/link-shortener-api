import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthModule } from '../jwt/jwt.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [JwtAuthModule],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthMiddleware],
})
export class AuthModule {}
