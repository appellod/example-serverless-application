import { expect } from "chai";
import * as io from "socket.io-client";

import { User } from "../../../mongoose";

require("../../");

describe("socketIo/routers/authenticationRouter.ts", function() {
  describe("authenticate", function() {
    context("when token is not provided", function() {
      it("returns an error", async function() {
        const socket = await io.connect("http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT);

        socket.emit("authenticate");
        const res: any = await new Promise((resolve) => socket.on("authenticate", resolve));

        expect(res.error).to.eql("Please provide your access token.");
      });
    });

    context("when an invalid token is provided", function() {
      it("returns an error", async function() {
        const socket = await io.connect("http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT);

        socket.emit("authenticate", { token: "invalid" });
        const res: any = await new Promise((resolve) => socket.on("authenticate", resolve));

        expect(res.error).to.eql("Invalid access token.");
      });
    });

    context("when a valid token is provided", function() {
      it("does not return an error", async function() {
        const socket = await io.connect("http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT);

        const user = await User.mock();
        const { token } = await user.login();

        socket.emit("authenticate", { token });
        const res: any = await new Promise((resolve) => socket.on("authenticate", resolve));

        expect(res).to.eql(null);
      });
    });
  });

  describe("unauthenticate", function() {
    it("does not return an error", async function() {
      const socket = await io.connect("http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT);

      const user = await User.mock();
      const { token } = await user.login();

      socket.emit("authenticate", { token });
      await new Promise((resolve) => socket.on("authenticate", resolve));

      socket.emit("unauthenticate");
      const res: any = await new Promise((resolve) => socket.on("unauthenticate", resolve));

      expect(res).to.eql(null);
    });
  });
});
