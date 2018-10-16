import { HttpServer, Injectable } from '@nestjs/common';
import { parse } from 'url';
import { Renderer, RequestHandler } from './types';

@Injectable()
class RenderService {
  private requestHandler?: RequestHandler;
  private renderer?: Renderer;
  private reply?: any;
  private req?: any;

  /**
   * Set the default request handler provided by next
   * @param handler
   */
  public setRequestHandler(handler: RequestHandler) {
    this.requestHandler = handler;
  }

  /**
   * Get the default request handler
   */
  public getRequestHandler(): RequestHandler | undefined {
    return this.requestHandler;
  }

  /**
   * Set the render function provided by next
   * @param renderer
   */
  public setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  /**
   * Get the render function provided by next
   */
  public getRenderer(): Renderer | undefined {
    return this.renderer;
  }

  /**
   * Set the current req and res
   * @param req
   * @param res
   */
  public next(req: any, reply: any) {
    this.req = req;
    this.reply = reply;
  }

  /**
   * Bind to the render function for the HttpServer that nest is using and override
   * it to allow for next to render the page
   * @param server
   */
  public bindHttpServer(server: HttpServer) {
    server.render = async (_: any, view: string, options: any) => {
      const renderer = this.getRenderer();

      if (this.req && this.reply && renderer) {
        await renderer(this.req, this.reply, `/views/${view}`, options);
        this.reply.finished = true;
      } else if (!this.req) {
        throw new Error('RenderService: req is not defined.');
      } else if (!this.reply) {
        throw new Error('RenderService: reply is not defined.');
      } else if (!renderer) {
        throw new Error('RenderService: renderer is not set.');
      } else {
        throw new Error('RenderService: failed to render');
      }
    };
  }
}

export default RenderService;
