import { HttpContext, FunctionRequest } from "./";

export type MiddlewareLayer = (
  ctx: HttpContext,
  req: FunctionRequest,
  next?: () => void
) => Promise<void>;

export class Middleware {
  private layers: MiddlewareLayer[];

  constructor(middleware?: MiddlewareLayer[]) {
    this.layers = middleware || [];
  }

  /**
   * Runs the middleware.
   */
  public async run(ctx: HttpContext, req: FunctionRequest) {
    if (this.layers.length === 0) {
      return;
    }

    const layers = [];

    // Create a linked list of middleware functions,
    // pointing each middleware to the next one.
    for (let i = this.layers.length - 1; i >= 0; i--) {
      const current: any = this.layers[i];

      const noop = () => {};
      const next: any = layers[i + 1] || noop;

      layers[i] = current.bind(current, ctx, req, next);
    }

    // Call the first middleware to start the chain.
    const first = layers[0];
    await first();
  }

  /**
   * Adds layers to the stack.
   */
  public use(layer: MiddlewareLayer | MiddlewareLayer[]) {
    this.layers = this.layers.concat(layer);
  }
}
