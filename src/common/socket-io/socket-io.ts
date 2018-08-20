import { Server } from "http";
import { RedisClient } from "redis";
import * as socketIo from "socket.io";
import * as redisAdapter from "socket.io-redis";
import { promisify } from "util";

import { AuthenticationRouter } from "./";
import { UserDocument } from "../mongo";

export interface IContext {
  data?: any;
  response?: any;
  socket?: ISocket;
}

export interface ISocket extends SocketIO.Socket {
  user?: UserDocument;
}

export class SocketIo {
  public static io: SocketIO.Server;

  constructor(pubClient: RedisClient, server: Server, subClient: RedisClient) {
    SocketIo.io = socketIo(server);
    SocketIo.io.adapter(redisAdapter({ pubClient, subClient }));

    SocketIo.io.on("connection", this.setup);

    // User.events.on("resetPassword", (user: UserDocument) => SocketIo.disconnect(user));
  }

  /**
   * Unidentifies all user's connected sockets.
   */
  public static async disconnect(user: UserDocument) {
    const adapter: redisAdapter.RedisAdapter = SocketIo.io.adapter();
    const clients = promisify(adapter.clients).bind(adapter);

    const socketIds = await clients(user.id);
    socketIds.array.forEach(async (socketId) => {
      const remoteLeave = promisify(adapter.remoteLeave).bind(adapter);
      await remoteLeave(socketId, user.id);
    });
  }

  /**
   * Sends an event and payload to all sockets registered to the given user.
   */
  public static emit(event: string, data: any, user: UserDocument) {
    SocketIo.io.to(user.id).emit(event, data);
  }

  /**
   * Associates a socket with a user.
   */
  public static identify(socket: ISocket, user: UserDocument) {
    socket.join(user.id);
    socket.user = user;
  }

  /**
   * Removes the association to the user from the socket.
   */
  public static unidentify(socket: ISocket) {
    socket.leave(socket.user.id);
    socket.user = null;
  }

  private setup(socket: ISocket) {
    new AuthenticationRouter(socket);
  }
}
