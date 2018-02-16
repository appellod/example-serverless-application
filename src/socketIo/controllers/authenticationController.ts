import { BearerStrategy } from "../../passport";
import { SocketIo } from "../";
import { Controller } from "./";

export class AuthenticationController extends Controller {
  public async authenticate(data: any) {
    const token: string = data.token;
    if (!token) {
      throw new Error("Please provide your access token.");
    }

    try {
      const user = await BearerStrategy.authenticate(token);
      if (!user) {
        throw new Error("Invalid access token.");
      }

      SocketIo.socketManager.registerSocketToUser(this.socket, user);
    } catch (e) {
      throw new Error("Invalid access token.");
    }
  }

  public async unauthenticate(data: any) {
    SocketIo.socketManager.removeUserFromSocket(this.socket);
  }
}
