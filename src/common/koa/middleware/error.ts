import { Context } from "koa";

/**
 * Catches all errors and returns the message in the body.
 */
export async function errorMiddleware(ctx: Context, next: () => {}) {
  try {
    await next();
  } catch (e) {
    let code = 400;

    if (e.message === "User does not have permission to perform this action.") {
      code = 403;
    }

    ctx.status = code;
    ctx.body = { error: e.message };
  }
}
