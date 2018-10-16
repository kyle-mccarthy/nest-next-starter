import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RequestHandler } from '@server/render/types';

@Catch()
class RenderFilter implements ExceptionFilter {
  private readonly requestHandler: RequestHandler;

  constructor(requestHandler: RequestHandler) {
    this.requestHandler = requestHandler;
  }

  /**
   * Nest isn't aware of how next handles routing for the build assets, let next
   * handle routing for any request that isn't handled by a controller
   * @param err
   * @param ctx
   */
  public async catch(err: any, ctx: ArgumentsHost) {
    const [ req, reply ] = ctx.getArgs();

    await this.requestHandler(req.raw, reply.res);

    reply.finished = true;
  }
}

export default RenderFilter;
