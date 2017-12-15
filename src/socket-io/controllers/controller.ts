import { SocketIO, Socket } from "../";

export abstract class Controller {
  protected socket: Socket;
  protected socketIo: SocketIO;

  constructor(socketIo: SocketIO, socket: Socket) {
    this.socket = socket;
    this.socketIo = socketIo;
  }

  /**
   * Adds a listener to the socket for the given event. Responds the event and
   * the function's returned results back to the client. Catches any errors and also returns
   * them back to the client.
   * @param event The name of the event. Ex: "connect", "disconnect".
   * @param fn The function to call on this event.
   */
  protected on(event: string, fn: (data: any) => any) {
    this.socket.on(event, async (data) => {
      data = data || {};

      try {
        const results = await fn(data);
        this.socket.emit(event, results);
      } catch (e) {
        this.socket.emit(event, { error: e.message });
      }
    });
  }
}
