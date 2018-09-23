import * as cookie from "cookie";
import * as uuid from "uuid/v1";

import { MiddlewareLayer } from "../middleware";

export interface SetOptions {
  maxAge?: number;
  sid?: string;
}

export interface SessionStore {
  destroy: (sid: string) => Promise<any>;
  get: (sid: string) => Promise<any>;
  set: (session: any, options?: SetOptions) => Promise<string>;
}

export interface SessionOptions {
  maxAge?: number;
  store: SessionStore;
}

/**
 * Adds session data to the incoming request.
 * Saves session data back to the session store.
 */
export function session(options: SessionOptions): MiddlewareLayer {
  return async (ctx, req, next) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const sid = cookies.sid ? cookies.sid : uuid();

    // Get session from the store.
    req.session = await options.store.get(sid);

    // Default session to an object with the session ID if falsy.
    req.session = req.session || { sid };

    await next();

    // Save cookie to the store.
    await options.store.set(req.session, { maxAge: options.maxAge, sid });

    // Send session ID if one was not provided.
    if (!cookies.sid) {
      ctx.res.headers["set-cookie"] = cookie.serialize("sid", sid);
    }
  };
}
