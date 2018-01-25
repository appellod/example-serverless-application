import { Socket } from "../";

export abstract class Controller {
  protected socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}
