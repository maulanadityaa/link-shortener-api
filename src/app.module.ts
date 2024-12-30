import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, AuthModule, JwtAuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
