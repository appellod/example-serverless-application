import { Context } from "koa";

/**
 * Parses the query string's "query" value into an object from JSON.
 */
export async function queryStringJsonParserMiddleware(ctx: Context, next: () => {}) {
  if (!ctx.query || !ctx.query.query) {
    return await next();
  }

  try {
    ctx.query = JSON.parse(ctx.query.query);
    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
}
