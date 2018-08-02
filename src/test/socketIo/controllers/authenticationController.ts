import { expect } from "chai";

import { User } from "../../../mongoose";
import { AuthenticationController, IContext, ISocket } from "../../../socketIo";
import { SocketMock } from "../../mocks";

require("../../");

describe("socketIo/controllers/authenticationController.ts", function() {
  let authenticationController: AuthenticationController;
  let socket: ISocket;

  beforeEach(() => {
    socket = new SocketMock() as ISocket;
    authenticationController = new AuthenticationController(socket);
  });

  describe("authenticate", function() {
    context("when token is not provided", function() {
      it("throws an error", async function() {
        const ctx = { data: {}, socket };

        try {
          await authenticationController.authenticate(ctx);
        } catch (e) {
          expect(e.message).to.eql("Please provide your access token.");
          return;
        }

        throw new Error("Error should have been thrown.");
      });
    });

    context("when an invalid token is provided", function() {
      it("throws an error", async function() {
        const ctx = { data: { token: "invalid" }, socket };

        try {
          await authenticationController.authenticate(ctx);
        } catch (e) {
          expect(e.message).to.eql("Invalid access token.");
          return;
        }

        throw new Error("Error should have been thrown.");
      });
    });

    context("when a valid token is provided", function() {
      it("does not return an error", async function() {
        const user = await User.mock();
        const { token } = await user.login();

        const ctx = { data: { token }, socket };
        await authenticationController.authenticate(ctx);

        expect(socket.user.id).to.eql(user.id);
      });
    });
  });

  describe("unauthenticate", function() {
    let ctx: IContext;

    beforeEach(async function() {
      const user = await User.mock();
      const { token } = await user.login();

      ctx = { data: { token }, socket };
      await authenticationController.authenticate(ctx);
    });

    it("removes the user from the socket", async function() {
      await authenticationController.unauthenticate(ctx);

      expect(socket.user).to.be.null;
    });
  });
});
