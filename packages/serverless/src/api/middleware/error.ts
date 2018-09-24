import { FunctionRequest, HttpContext } from "@example/azura";

/**
 * Catches all errors and returns the message in the body.
 */
export async function errorMiddleware(ctx: HttpContext, req: FunctionRequest, next: () => void) {
  try {
    await next();
  } catch (e) {
    let status = e.status || 400;

    switch (e.message) {
      case "User does not have permission to perform this action.":
        status = 403;
        break;
    }

    ctx.res.body = { error: e.message };
    ctx.res.status = status;
  }
}
