import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './app.vars';
import enableSwagger from './swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  enableSwagger(app);
  const port = Number(process.env.PORT ?? APP_PORT);
  await app.listen(port, () => {
    Logger.verbose(
      `server listening at http://localhost:${port} 🙌 `,
      'Main'
    );
  });
}
bootstrap();
