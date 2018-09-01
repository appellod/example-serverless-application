import { Context } from "koa";

/**
 * Parses the query string's "query" value into an object from JSON.
 */
export async function parseQueryJsonMiddleware(ctx: Context, next: () => {}) {
  if (!ctx.query || !ctx.query.query) {
    return await next();
  }

  try {
    const json = JSON.parse(ctx.query.query);
    Object.assign(ctx.query, json);
    delete ctx.query.query;

    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
}
