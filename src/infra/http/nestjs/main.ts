import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './app.vars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? APP_PORT);
  await app.listen(port, () => {
    Logger.verbose(
      `server listening at http://localhost:${port} 🙌 `,
      'Main'
    );
  });
}
bootstrap();
