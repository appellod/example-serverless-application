import { expect } from "chai";
import * as nock from "nock";

import { Token, TokenDocument } from "../../../mongoose";

const index = require("../../");

describe("mongoose/models/token.ts", function() {
  describe("schema.methods.isExpired()", function() {
    let token: TokenDocument;

    beforeEach(async function() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      token = await Token.mock({ expiresAt: yesterday });
    });

    it("returns whether or not the token is expired", function() {
      expect(token.isExpired()).to.be.true;
    });
  });

  describe("schema.methods.refresh()", function() {
    let token: TokenDocument;

    beforeEach(async function() {
      token = await Token.mock({
        expiresAt: new Date()
      });
    });

    it("updates the token's expiresAt", async function() {
      const expiresAt = token.expiresAt;

      token = await token.refresh();
      expect(token.expiresAt).to.be.above(expiresAt.getTime());
    });
  });
});
