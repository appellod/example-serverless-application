import { BearerStrategy } from "../../passport";
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

      this.socket.user = user;
    } catch (e) {
      throw new Error("Invalid access token.");
    }
  }
}
