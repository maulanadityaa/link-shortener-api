import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';
import { LinkModule } from './link/link.module';
import { SwaggerModule } from './swagger/swagger.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    JwtAuthModule,
    UserModule,
    LinkModule,
    SwaggerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
