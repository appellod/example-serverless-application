import { BearerStrategy } from "../../passport";
import { IContext, SocketIo } from "../";
import { Controller } from "./";

export class AuthenticationController extends Controller {
  public async authenticate(ctx: IContext) {
    if (!ctx.data.token) {
      throw new Error("Please provide your access token.");
    }

    try {
      const user = await BearerStrategy.authenticate(ctx.data.token);
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
