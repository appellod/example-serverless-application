import { BearerStrategy } from "../../passport/strategies/bearer";
import { SocketIO, Socket } from "../";
import { Controller } from "./controller";

export class AuthenticationController extends Controller {
  constructor(socketIo: SocketIO, socket: Socket) {
    super(socketIo, socket);

    this.on("authenticate", this.authenticate.bind(this));
  }

  /**
   * Associates a user with the current socket.
   * @param data The data from the client.
   */
  private async authenticate(data: any) {
    const token: string = data.token;
    if (!token) {
      throw new Error("Please provide your access token.");
    }

    try {
      const user = await BearerStrategy.authenticate(token);
      if (!user) {
        throw new Error("Invalid access token.");
      }

      this.socket.user = user;
    } catch (e) {
      throw new Error("Invalid access token.");
    }
  }
}
