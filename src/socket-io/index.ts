import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";

import { IUserDocument } from "../mongoose/models/user";
import { AuthenticationController } from "./controllers/authentication";

export interface ISocket extends SocketIO.Socket {
  user: IUserDocument;
}

export class SocketIO {
  private io: SocketIO.Server;
  private sockets: ISocket[] = [];

  constructor(server: http.Server) {
    this.io = socketIo(server);

    this.io.on("connection", (socket: ISocket) => {
      this.sockets.push(socket);

      const authenticationController = new AuthenticationController(this, socket);

      socket.on("disconnect", () => {
        const index = this.sockets.findIndex((s) => s.id === socket.id);
        if (index >= 0) {
          this.sockets.splice(index, 1);
        }
      });
    });
  }
}
