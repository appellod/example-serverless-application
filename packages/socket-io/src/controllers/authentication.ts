import { User } from "@example/postgres";
import * as jwt from "jsonwebtoken";

import { IContext, SocketIo } from "../";
import { BaseController } from "./";

export class AuthenticationController extends BaseController {
  public async authenticate(ctx: IContext) {
    if (!ctx.data.token) {
      throw new Error("Please provide your access token.");
    }

    try {
      const decoded: any = jwt.verify(ctx.data.token, process.env.JWT_SECRET);
      const user = await User.query().where({ id: decoded.user.id }).first();

      if (!user) {
        throw new Error("Invalid access token.");
      }

      SocketIo.identify(ctx.socket, user);
    } catch (e) {
      throw new Error("Invalid access token.");
    }
  }

  public async unauthenticate(ctx: IContext) {
    SocketIo.unidentify(ctx.socket);
  }
}
