import * as url from "url";

import { MiddlewareLayer } from "../middleware";
import { send, SendOptions } from "./send";

/**
 * Serves static files from the given root directory.
 */
export function serve(options: SendOptions): MiddlewareLayer {
  return async (ctx, req) => {
    const parsedUrl = url.parse(req.originalUrl);

    await send(ctx, parsedUrl.pathname, options);
  };
}
