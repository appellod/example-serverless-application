import * as http from "http";
import * as socketIo from "socket.io";

import { UserDocument } from "../mongoose";
import { AuthenticationRouter, Socket, SocketManager } from "./";

export class SocketIo {
  public static socketManager: SocketManager;
  private io: SocketIO.Server;

  constructor(server: http.Server) {
    SocketIo.socketManager = new SocketManager();

    this.io = socketIo(server);
    this.io.on("connection", (socket: Socket) => {
      SocketIo.socketManager.addSocket(socket);

      const authenticationRouter = new AuthenticationRouter(socket);

      socket.on("disconnect", () => SocketIo.socketManager.removeSocket(socket));
    });
  }
}
