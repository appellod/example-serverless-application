import { AuthenticationController, ISocket } from "../";
import { authenticationMiddleware } from "../middleware";
import { BaseRouter } from "./";

export class AuthenticationRouter extends BaseRouter {
  constructor(socket: ISocket) {
    super(socket);

    const controller = new AuthenticationController(socket);

    this.on("authenticate", controller.authenticate);
    this.on("unauthenticate", authenticationMiddleware, controller.unauthenticate);
  }
}
