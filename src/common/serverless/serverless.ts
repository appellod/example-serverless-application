import { promisify } from "util";
import * as ware from "ware";

import { HttpContext, IFunctionRequest } from "./interfaces";

type Middleware = (ctx: HttpContext, req: IFunctionRequest, next?: () => {}) => Promise<void>;
interface Route {
  method: string;
  middleware: Middleware[];
  path: string;
  regex?: RegExp;
}

export class Serverless {
  private routes: Route[];
  private stack: any;

  constructor() {
    this.routes = [];
    this.stack = ware();
  }

  /**
   * Registers middleware to a matching DELETE request.
   */
  public delete(path: string, ...middleware: Middleware[]) {
    this.route("DELETE", path, ...middleware);
  }

  /**
   * Registers middleware to a matching GET request.
   */
  public get(path: string, ...middleware: Middleware[]) {
    this.route("GET", path, ...middleware);
  }

  /**
   * Maps a request to a route and runs the middleware.
   */
  public async listen(ctx: HttpContext, req: IFunctionRequest) {
    try {
      const route = this.getRoute(req.method, req.originalUrl);

      // Return 404 if path is not found.
      if (!route) {
        throw new Error("Not found");
      }

      req.params = this.getParams(route, req.originalUrl);
      route.middleware.forEach((m) => this.stack.use(m));

      const run = promisify(this.stack.run).bind(this.stack);
      await run(ctx, req);
    } catch (err) {
      this.formatError(ctx, err);
    } finally {
      ctx.done();
    }
  }

  /**
   * Registers middleware to a matching POST request.
   */
  public post(path: string, ...middleware: Middleware[]) {
    this.route("POST", path, ...middleware);
  }

  /**
   * Registers middleware to a matching PUT request.
   */
  public put(path: string, ...middleware: Middleware[]) {
    this.route("PUT", path, ...middleware);
  }

  /**
   * Adds middleware to all routes.
   */
  public use(middleware: Middleware) {
    this.stack.use(middleware);
  }

  /**
   * Formats errors for the response.
   */
  private formatError(ctx: HttpContext, err: Error) {
    let status = 400;

    switch (err.message) {
      case "Unauthorized":
        status = 401;
        break;
      case "User does not have permission to perform this action.":
        status = 403;
        break;
      case "Not found":
        status = 404;
        break;
    }

    ctx.res.body = { error: err.message };
    ctx.res.status = status;

    ctx.log.error(err.message);
  }

  /**
   * Gets the route parameters from the URL.
   */
  private getParams(route: Route, url: string) {
    // Find variables within path.
    let variables = route.path.match(/:\w+/g);

    if (!variables) {
      return {};
    }

    // Remove query parameters from URL.
    url = url.replace(/\?.*/, "");

    // Remove : from variable names.
    variables = variables.map((s) => s.substring(1));

    // Map variables from path into params object.
    const matches = route.regex.exec(url);
    return variables.reduce((pre, cur, i) => {
      pre[cur] = matches[i + 1];
      return pre;
    }, {});
  }

  /**
   * Finds the route that matches the method and URL.
   */
  private getRoute(method: string, url: string) {
    return this.routes.find((r) => {
      if (r.method !== method) {
        return false;
      }

      // Remove query parameters from URL.
      url = url.replace(/\?.*/, "");

      // Replace all variables with alphanumeric regular expression matching.
      let path = r.path.replace(/:\w+/g, "(\\w+)");

      // Add $ so we don't match anything after the path.
      path += "$";

      // Save regex for later.
      r.regex = new RegExp(path);

      return r.regex.test(url);
    });
  }

  /**
   * Registers middleware to a given method and path.
   */
  private route(method: string, path: string, ...middleware: Middleware[]) {
    this.routes.push({ method, middleware, path });
  }
}
