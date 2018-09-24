import { FunctionRequest, HttpContext, Middleware, MiddlewareLayer } from "./";

export class Application {
  private middleware: Middleware;

  constructor() {
    this.middleware = new Middleware();
  }

  /**
   * Begin processing requests.
   */
  public listen() {
    return async (ctx: HttpContext, req: FunctionRequest) => {
      // Set the default content-type to JSON.
      ctx.res.headers = { "content-type": "application/json" };

      // Set the default status to 404 in case no middleware alter the response.
      ctx.res.status = 404;

      // Run middleware.
      await this.middleware.run(ctx, req);

      // Let Azure know we are done after middleware finish.
      ctx.done();
    };
  }

  /**
   * Registers middleware.
   */
  public use(middleware: MiddlewareLayer | MiddlewareLayer[]) {
    this.middleware.use(middleware);
  }
}
