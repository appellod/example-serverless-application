import * as chai from "chai";
import * as Chance from "chance";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { User, UserDocument } from "../../mongoose";
import { Socket, SocketManager } from "../../socketIo";
import { SocketMock } from "../mocks";

const index = require("../");

const chance = new Chance();
const expect = chai.expect;
chai.use(sinonChai);

describe("socketIo/socketManager.ts", function() {
  let socket: Socket;
  let socketManager: SocketManager;

  beforeEach(() => {
    socket = new SocketMock() as Socket;
    socketManager = new SocketManager();
  });

  describe("addSocket()", function() {
    it("adds the socket to its sockets array", function() {
      socketManager.addSocket(socket);

      expect(socketManager.sockets.length).to.eql(1);
      expect(socketManager.sockets).to.contain(socket);
    });
  });

  describe("emitToUser()", function() {
    it("emits the event and payload to all the user's sockets", async function() {
      socketManager.addSocket(socket);

      const user = await User.mock();
      socketManager.registerSocketToUser(socket, user);

      const otherSocket = new SocketMock() as Socket;
      socketManager.addSocket(otherSocket);

      const socketSpy = sinon.spy(socket, "emit");
      const otherSocketSpy = sinon.spy(otherSocket, "emit");
      socketManager.emitToUser("test", {}, user);

      expect(socketSpy).to.have.been.called;
      expect(otherSocketSpy).to.not.have.been.called;
    });
  });

  describe("getSocketsByUser()", function() {
    it("returns all sockets associated with the user", async function() {
      socketManager.addSocket(socket);

      const user = await User.mock();
      socketManager.registerSocketToUser(socket, user);

      const otherSocket = new SocketMock() as Socket;
      socketManager.addSocket(otherSocket);

      const sockets = socketManager.getSocketsByUser(user);

      expect(sockets.length).to.eql(1);
      expect(sockets).to.contain(socket);
    });
  });

  describe("registerSocketToUser()", function() {
    it("sets the socket's user to the user", async function() {
      socketManager.addSocket(socket);

      const user = await User.mock();
      socketManager.registerSocketToUser(socket, user);

      expect(socket.user).to.eql(user);
      expect(socketManager.sockets[0].user).to.eql(user);
    });
  });

  describe("removeSocket()", function() {
    it("removes the socket from its sockets array", function() {
      socketManager.addSocket(socket);

      const otherSocket = { id: chance.string() } as Socket;
      socketManager.addSocket(otherSocket);

      socketManager.removeSocket(socket);

      expect(socketManager.sockets.length).to.eql(1);
      expect(socketManager.sockets).to.not.contain(socket);
      expect(socketManager.sockets).to.contain(otherSocket);
    });
  });

  describe("removeUserFromSocket()", function() {
    it("removes the user from the socket", async function() {
      socketManager.addSocket(socket);

      const user = await User.mock();
      socketManager.registerSocketToUser(socket, user);

      socketManager.removeUserFromSocket(socket);

      expect(socket.user).to.be.null;
      expect(socketManager.sockets[0].user).to.be.null;
    });
  });
});
