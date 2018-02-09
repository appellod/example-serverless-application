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
  private static sockets: Socket[] = [];

  constructor(server: http.Server) {
    this.io = socketIo(server);

    this.io.on("connection", (socket: Socket) => {
      SocketIo.registerSocket(socket);

      const authenticationRouter = new AuthenticationRouter(socket);

      socket.on("disconnect", () => SocketIo.removeSocket(socket));
    });
  }

  /**
   * Sends an event and payload to all sockets registered to the given user.
   * @param event The event.
   * @param data The payload to send to the user.
   * @param user The user to send the event and payload to.
   */
  public static emitToUser(event: string, data: any, user: UserDocument) {
    const sockets = SocketIo.getSocketsByUser(user);
    sockets.forEach((socket) => {
      socket.emit(event, data);
    });
  }

  /**
   * Finds all the sockets registered to the given user.
   * @param user The user to find sockets by.
   */
  public static getSocketsByUser(user: UserDocument) {
    return SocketIo.sockets.filter((socket) => socket.user.id === user.id);
  }

  /**
   * Registers a socket.
   * @param socket The socket to register.
   */
  public static registerSocket(socket: Socket) {
    SocketIo.sockets.push(socket);
  }

  /**
   * Associates a socket with a user.
   * @param socket The socket.
   * @param user The user.
   */
  public static registerSocketToUser(socket: Socket, user: UserDocument) {
    socket.user = user;
  }

  /**
   * Removes a socket.
   * @param socket The socket.
   */
  public static removeSocket(socket: Socket) {
    const index = SocketIo.sockets.findIndex((s) => s.id === socket.id);
    if (index >= 0) {
      SocketIo.sockets.splice(index, 1);
    }
  }
}
