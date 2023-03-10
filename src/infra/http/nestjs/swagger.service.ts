import { type INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerDocumentOptions
} from '@nestjs/swagger';

export default (app: INestApplication, path = 'api') => {
  const pkg = require('../../../../package.json');
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription('This is our API')
    .setVersion('v1')
    .build();
  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions
  );

  SwaggerModule.setup(path, app, swaggerDocument);
};
