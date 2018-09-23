import { posix } from "path";
import { parse } from "url";

import { FunctionRequest, Middleware, MiddlewareLayer } from "../";

export class Router {
  private basePath: string;
  private middleware: MiddlewareLayer[];

  constructor(basePath?: string) {
    this.basePath = basePath;
    this.middleware = [];
  }

  /**
   * Registers middleware to a matching DELETE request.
   */
  public delete(path: string, ...middleware: MiddlewareLayer[]) {
    this.route("DELETE", path, ...middleware);
  }

  /**
   * Registers middleware to a matching GET request.
   */
  public get(path: string, ...middleware: MiddlewareLayer[]) {
    this.route("GET", path, ...middleware);
  }

  /**
   * Registers middleware to a matching POST request.
   */
  public post(path: string, ...middleware: MiddlewareLayer[]) {
    this.route("POST", path, ...middleware);
  }

  /**
   * Registers middleware to a matching PUT request.
   */
  public put(path: string, ...middleware: MiddlewareLayer[]) {
    this.route("PUT", path, ...middleware);
  }

  /**
   * Returns this router's middleware.
   */
  public routes() {
    return this.middleware;
  }

  /**
   * Registers middleware.
   */
  public use(middleware: MiddlewareLayer | MiddlewareLayer[]) {
    this.middleware = this.middleware.concat(middleware);
  }

  /**
   * Returns true if the provided method and path match the incoming request.
   */
  private match(method: string, path: string, req: FunctionRequest) {
    if (req.method !== method) {
      return false;
    }

    const parsedUrl = parse(req.originalUrl);

    return this.pathToRegExp(path).test(parsedUrl.pathname);
  }

  /**
   * Gets the named route parameters from the URL.
   */
  private params(path: string, url: string) {
    // Find variables within path.
    let variables = path.match(/:\w+/g);

    if (!variables) {
      return {};
    }

    const parsedUrl = parse(url);

    // Remove : from variable names.
    variables = variables.map((s) => s.substring(1));

    // Map path variables into params object.
    const regex = this.pathToRegExp(path);
    const matches = regex.exec(parsedUrl.pathname);

    return variables.reduce((pre, cur, i) => {
      pre[cur] = matches[i + 1];
      return pre;
    }, {});
  }

  /**
   * Returns a RegExp for the path.
   */
  private pathToRegExp(path) {
    // Replace all variables with alphanumeric regular expression matching.
    path = path.replace(/:\w+/g, "([^\\/]+)");

    // Combine basePath with path.
    const basePath = this.basePath ? this.basePath : "";
    const wholePath = posix.join("/", basePath, path);

    return new RegExp("^" + wholePath + "$");
  }

  /**
   * Registers middleware to a given method and path.
   */
  private route(method: string, path: string, ...middleware: MiddlewareLayer[]) {
    const routeMiddleware: MiddlewareLayer = async (ctx, req, next) => {
      if (this.match(method, path, req)) {
        // Route found, so default status to 200.
        ctx.res.status = 200;

        // Parse URL params.
        req.params = this.params(path, req.originalUrl);

        await new Middleware(middleware).run(ctx, req);
      } else if (next) {
        await next();
      }
    };

    this.middleware.push(routeMiddleware);
  }
}
