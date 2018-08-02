import { UserDocument } from "../mongoose/";

export interface Socket extends SocketIO.Socket {
  user?: UserDocument;
}

export class SocketManager {
  public sockets: Socket[] = [];

  /**
   * Adds a socket to the active sockets.
   * @param socket The socket to register.
   */
  public addSocket(socket: Socket) {
    this.sockets.push(socket);
  }

  /**
   * Sends an event and payload to all sockets registered to the given user.
   * @param event The event.
   * @param data The payload to send to the user.
   * @param user The user to send the event and payload to.
   */
  public emitToUser(event: string, data: any, user: UserDocument) {
    const sockets = this.getSocketsByUser(user);
    sockets.forEach((socket) => {
      socket.emit(event, data);
    });
  }

  /**
   * Finds all the sockets registered to the given user.
   * @param user The user to find sockets by.
   */
  public getSocketsByUser(user: UserDocument) {
    return this.sockets.filter((socket) => socket.user === user);
  }

  /**
   * Associates a socket with a user.
   * @param socket The socket.
   * @param user The user.
   */
  public registerSocketToUser(socket: Socket, user: UserDocument) {
    socket.user = user;
  }

  /**
   * Removes a socket from the active sockets.
   * @param socket The socket.
   */
  public removeSocket(socket: Socket) {
    const index = this.sockets.findIndex((s) => s.id === socket.id);
    if (index >= 0) {
      this.sockets.splice(index, 1);
    }
  }

  /**
   * Removes the association to the user from the socket.
   * @param socket The socket.
   */
  public removeUserFromSocket(socket: Socket) {
    socket.user = null;
  }
}
