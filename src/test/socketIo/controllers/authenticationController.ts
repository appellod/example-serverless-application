import { expect } from "chai";

import { User, UserDocument } from "../../../mongoose";
import { AuthenticationController, Socket } from "../../../socketIo";

const index = require("../../");

describe("socketIo/controllers/authenticationController.ts", function() {
  let authenticationController: AuthenticationController;
  let socket: Socket;

  beforeEach(() => {
    socket = {} as Socket;
    authenticationController = new AuthenticationController(socket);
  });

  describe("authenticate", function() {
    context("when token is not provided", function() {
      it("throws an error", async function() {
        const data = {};

        try {
          await authenticationController.authenticate(data);
        } catch (e) {
          expect(e.message).to.eql("Please provide your access token.");
          return;
        }

        throw new Error("Error should have been thrown.");
      });
    });

    context("when an invalid token is provided", function() {
      it("throws an error", async function() {
        const data = {
          token: "invalid"
        };

        try {
          await authenticationController.authenticate(data);
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

        const data = {
          token: token._id
        };

        await authenticationController.authenticate(data);

        expect(socket.user.id).to.eql(user.id);
      });
    });
  });

  describe("unauthenticate", function() {
    it("removes the user from the socket", async function() {
      const user = await User.mock();
      const { token } = await user.login();

      const data = {
        token: token._id
      };
      await authenticationController.authenticate(data);

      await authenticationController.unauthenticate(null);

      expect(socket.user).to.been.null;
    });
  });
});
