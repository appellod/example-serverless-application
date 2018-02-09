import * as chai from "chai";

import { Mongoose, UserDocument } from "../../mongoose";
import { AuthenticationController, Socket, SocketIo } from "../../socketIo";

const index = require("../../");

const expect = chai.expect;

describe("socketIo/socketIo.ts", function() {
  let socket: Socket;

  beforeEach(() => {
    socket = {} as Socket;
  });

  describe("emitToUser()", function() {

  });

  describe("getSocketsByUser()", function() {

  });

  describe("registerSocket()", function() {

  });

  describe("registerSocketToUser()", function() {
    
  });

  describe("removeSocket()", function() {

  });
});
