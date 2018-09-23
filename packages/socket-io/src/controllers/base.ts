import { ISocket } from "../";

export abstract class BaseController {
  protected socket: ISocket;

  constructor(socket: ISocket) {
    this.socket = socket;
  }
}
