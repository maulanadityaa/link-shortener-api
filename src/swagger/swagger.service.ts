import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(process.env.APP_NAME)
      .setDescription(process.env.APP_DESCRIPTION)
      .setVersion(process.env.APP_VERSION)
      .setContact(
        process.env.APP_AUTHOR_NAME,
        process.env.APP_AUTHOR_URL,
        process.env.APP_AUTHOR_EMAIL,
      )
      .addBearerAuth()
      .addServer(process.env.APP_LOCAL_URL)
      .addServer(process.env.APP_PROD_URL)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Link Shortener API Documentation',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        `
      window.addEventListener('load', function() {
        var link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/favicon.ico'; // Use the default Swagger UI favicon
        document.head.appendChild(link);
      });
    `,
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      ],
    });
  }
}
