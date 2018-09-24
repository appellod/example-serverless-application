import { FunctionRequest, HttpContext, HttpError } from "@example/azura";
import { User } from "@example/postgres";
import * as jwt from "jsonwebtoken";

/**
 * Authenticates the user's access token.
 */
export async function authenticationMiddleware(ctx: HttpContext, req: FunctionRequest, next: () => void) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.query().where({ id: decoded.user.id }).first();
    if (!req.user) {
      throw new Error("User not found.");
    }
  } catch (e) {
    throw new HttpError(401, "Invalid access token.");
  }

  await next();
}
