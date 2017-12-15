import * as chai from "chai";
import * as io from "socket.io-client";

import { Mongoose } from "@src/mongoose";
import { UserDocument, AuthToken } from "@src/mongoose/models/user";

const index = require("../");
const config = index.config;

const expect = chai.expect;

describe("socket-io/authentication.ts", function() {
  describe("authenticate", function() {
    context("when token is not provided", function() {
      it("returns an error", async function() {
        const socket = await io.connect("http://" + config.server.host + ":" + config.server.port);

        socket.emit("authenticate");
        const res: any = await new Promise((resolve) => {
          socket.on("authenticate", resolve);
        });

        expect(res.error).to.eql("Please provide your access token.");
      });
    });

    context("when an invalid token is provided", function() {
      it("returns an error", async function() {
        const socket = await io.connect("http://" + config.server.host + ":" + config.server.port);

        socket.emit("authenticate", { token: "invalid" });
        const res: any = await new Promise((resolve) => {
          socket.on("authenticate", resolve);
        });

        expect(res.error).to.eql("Invalid access token.");
      });
    });

    context("when a valid token is provided", function() {
      it("does not return an error", async function() {
        const socket = await io.connect("http://" + config.server.host + ":" + config.server.port);

        const user = await Mongoose.User.findOne({ email: "test@example.com" });
        const { token } = await user.login();

        socket.emit("authenticate", { token: token._id });
        const res: any = await new Promise((resolve) => {
          socket.on("authenticate", resolve);
        });

        expect(res).to.eql(null);
      });
    });
  });
});
