import * as jwt from "jsonwebtoken";

import { User } from "../../postgres";
import { HttpContext, IFunctionRequest } from "../interfaces";

/**
 * Catches all errors and returns the message in the body.
 */
export async function authenticationMiddleware(ctx: HttpContext, req: IFunctionRequest, next: () => {}) {
  const token = req.headers.Authorization.replace("Bearer ", "");

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.query().where({ id: decoded.user.id }).first();

  if (!req.user) {
    throw new Error("Unauthorized");
  }

  await next();
}
