import { AuthenticationController, Socket } from "../";
import { Router } from "./";

export class AuthenticationRouter extends Router {
  constructor(socket: Socket) {
    super(socket);

    const controller = new AuthenticationController(socket);

    this.on("authenticate", (data) => controller.authenticate(data));
    this.on("unauthenticate", (data) => controller.unauthenticate(data));
  }
}
