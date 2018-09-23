import { FunctionRequest, HttpContext } from "@example/azura";

/**
 * Parses the query string's "query" value into an object from JSON.
 */
export async function queryToJsonMiddleware(ctx: HttpContext, req: FunctionRequest, next: () => void) {
  if (req.query && req.query.query) {
    const json = JSON.parse(req.query.query);
    Object.assign(req.query, json);
    delete req.query.query;
  }

  await next();
}
