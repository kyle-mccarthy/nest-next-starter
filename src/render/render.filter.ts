import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ErrorRenderer, RequestHandler } from '@server/render/types';
import { parse as parseUrl } from 'url';

@Catch()
class RenderFilter implements ExceptionFilter {
  private readonly requestHandler: RequestHandler;
  private readonly errorRenderer: ErrorRenderer;
  private readonly logger: Logger;

  constructor(requestHandler: RequestHandler, errorRenderer: ErrorRenderer) {
    this.requestHandler = requestHandler;
    this.logger = new Logger();
    this.errorRenderer = errorRenderer;
  }

  /**
   * Nest isn't aware of how next handles routing for the build assets, let next
   * handle routing for any request that isn't handled by a controller
   * @param err
   * @param ctx
   */
  public async catch(err: any, ctx: ArgumentsHost) {
    const [req, res] = ctx.getArgs();

    if (!res.headersSent) {
      if (err.response === undefined) {
        const { pathname, query } = parseUrl(req.url, true);
        this.logger.error(err.message, err.stack);
        await this.errorRenderer(err, req, res, pathname, query);
      } else {
        await this.requestHandler(req, res);
      }
    }
  }
}

export default RenderFilter;
