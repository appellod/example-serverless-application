import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";

import { UserDocument } from "../mongoose/";
import { AuthenticationRouter } from "./";

export interface Socket extends SocketIO.Socket {
  user?: UserDocument;
}

export class SocketIo {
  private io: SocketIO.Server;
  private sockets: Socket[] = [];

  constructor(server: http.Server) {
    this.io = socketIo(server);

    this.io.on("connection", (socket: Socket) => {
      this.sockets.push(socket);

      const authenticationRouter = new AuthenticationRouter(socket);

      socket.on("disconnect", () => {
        const index = this.sockets.findIndex((s) => s.id === socket.id);
        if (index >= 0) {
          this.sockets.splice(index, 1);
        }
      });
    });
  }
}
