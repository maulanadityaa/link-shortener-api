import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SwaggerService } from './swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.enableCors({
    origin: '*', // In production, replace with your specific domains
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const swaggerService = app.get(SwaggerService);
  swaggerService.setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
