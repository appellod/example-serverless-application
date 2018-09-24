import * as ware from "ware";
import { promisify } from "util";

import { IContext, ISocket } from "../";

export abstract class BaseRouter {
  protected socket: ISocket;

  constructor(socket: ISocket) {
    this.socket = socket;
  }

  /**
   * Adds a listener to the socket for the given event. Returns the event and
   * the function's returned results back to the client. Catches any errors and also returns
   * them back to the client.
   * @param event The name of the event. Ex: "connect", "disconnect".
   * @param middleware The functions to call. Will be executed in order.
   */
  protected on(event: string, ...middleware: Array<(ctx: IContext) => Promise<any>>) {
    this.socket.on(event, async (data) => {
      const ctx = {
        data: data || {},
        socket: this.socket
      } as IContext;

      try {
        const stack = ware();
        middleware.forEach((mw) => stack.use(mw));

        const run = promisify(stack.run).bind(stack);
        await run(ctx);

        this.socket.emit(event, ctx.response);
      } catch (e) {
        this.socket.emit(event, { error: e.message });
      }
    });
  }
}
