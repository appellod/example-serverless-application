import { ISocket } from "../";

export abstract class Controller {
  protected socket: ISocket;

  constructor(socket: ISocket) {
    this.socket = socket;
  }
}
