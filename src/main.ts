import { NestFactory } from '@nestjs/core';
import RenderFilter from '@server/render/render.filter';
import RenderMiddleware from '@server/render/render.middleware';
import RenderService from '@server/render/render.service';
import Next from 'next';
import { AppModule } from './app.module';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule);

  const renderService = server.get(RenderService);

  renderService.setRequestHandler(app.getRequestHandler());
  renderService.setRenderer(app.render.bind(app));
  renderService.setErrorRenderer(app.renderError.bind(app));

  renderService.bindHttpServer(server.getHttpAdapter());

  server.use(new RenderMiddleware(renderService).resolve());
  server.useGlobalFilters(
    new RenderFilter(
      renderService.getRequestHandler()!,
      renderService.getErrorRenderer()!
    )
  );

  await server.listen(3000);
}

bootstrap();
