import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { JwtAuthModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtAuthModule, UserModule],
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
