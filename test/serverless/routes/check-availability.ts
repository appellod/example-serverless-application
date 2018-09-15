import { expect } from "chai";

import { index } from "../../../src/serverless/routes/check-availability";

import { UserMock } from "../../common/postgres/mocks";
import { FunctionRequestMock, HttpContextMock } from "../mocks";

describe("serverless/routes/check-availability/index.ts", function() {
  context("when email is available", function() {
    it("returns isAvailable set to true", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        query: {
          email: "available@example.com"
        }
      });

      await index(ctx, req);

      expect(ctx.res.body.isAvailable).to.be.true;
    });
  });

  context("when email is unavailable", function() {
    beforeEach(async function() {
      await UserMock.insert({ email: "taken@example.com" });
    });

    it("returns isAvailable set to false", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        query: {
          email: "taken@example.com"
        }
      });

      await index(ctx, req);

      expect(ctx.res.body.isAvailable).to.be.false;
    });
  });
});
