import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './commons/environment';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(Env.SWAGGER_TITLE)
    .setDescription(Env.SWAGGER_DESCRIPTION)
    .setVersion(Env.APPLICATION_VERSION)
    .addServer(Env.SWAGGER_SERVER)
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup(Env.SWAGGER_DOCS, app, swaggerDocument);

  const port = Env.APPLICATION_PORT;

  await app
    .listen(parseInt(port.toString(), 10), '0.0.0.0')
    .then(() => {
      Logger.log(`API Listen on ${port}`);
    })
    .catch((error: any) => Logger.error(error));
}
bootstrap();
