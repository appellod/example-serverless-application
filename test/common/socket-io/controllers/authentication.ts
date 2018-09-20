import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as jwt from "jsonwebtoken";

import { AuthenticationController, IContext, ISocket } from "../../../../src/common/socket-io";
import { UserMock } from "../../../../src/common/postgres/mocks";
import { SocketMock } from "../../../../src/common/socket-io/mocks";

const expect = chai.expect;

chai.use(chaiAsPromised);

describe("common/socketIo/controllers/authenticationController.ts", function() {
  let authenticationController: AuthenticationController;
  let socket: ISocket;

  beforeEach(() => {
    socket = new SocketMock() as ISocket;
    authenticationController = new AuthenticationController(socket);
  });

  describe("authenticate", function() {
    context("when token is not provided", function() {
      it("throws an error", function() {
        const ctx = { data: {}, socket };

        const promise = authenticationController.authenticate(ctx);

        return expect(promise).to.be.rejectedWith("Please provide your access token.");
      });
    });

    context("when an invalid token is provided", function() {
      it("throws an error", async function() {
        const ctx = { data: { token: "invalid" }, socket };

        const promise = authenticationController.authenticate(ctx);

        return expect(promise).to.be.rejectedWith("Invalid access token.");
      });
    });

    context("when a valid token is provided", function() {
      it("does not return an error", async function() {
        const user = await new UserMock().create();
        const token = jwt.sign({ user }, process.env.JWT_SECRET);

        const ctx = { data: { token }, socket };
        await authenticationController.authenticate(ctx);

        expect(socket.user.id).to.eql(user.id);
      });
    });
  });

  describe("unauthenticate", function() {
    let ctx: IContext;

    beforeEach(async function() {
      const user = await new UserMock().create();
      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      ctx = { data: { token }, socket };
      await authenticationController.authenticate(ctx);
    });

    it("removes the user from the socket", async function() {
      await authenticationController.unauthenticate(ctx);

      expect(socket.user).to.be.null;
    });
  });
});
