import { FunctionRequest, HttpContext } from "@example/azura";
import { FunctionRequestMock, HttpContextMock,  } from "@example/azura/mocks";
import { UserMock } from "@example/postgres/mocks";
import { expect } from "chai";
import * as jwt from "jsonwebtoken";

import { authenticationMiddleware } from "../../../src/api/middleware";

describe("middleware/authentication.ts", function() {
  let ctx: HttpContext;
  let req: FunctionRequest;

  beforeEach(function() {
    ctx = new HttpContextMock();
    req = new FunctionRequestMock();
  });

  context("when no token is provided", function() {
    it("throws an error", function() {
      const promise = authenticationMiddleware(ctx, req, () => {});

      expect(promise).to.be.rejectedWith("Invalid access token.");
    });
  });

  context("when the JWT is invalid", function() {
    it("throws an error", function() {
      req.headers.authorization = "Bearer eiofbnweifn";

      const promise = authenticationMiddleware(ctx, req, () => {});

      expect(promise).to.be.rejectedWith("Invalid access token.");
    });
  });

  context("when the user is not found", function() {
    it("throws an error", function() {
      req.headers.authorization = jwt.sign({ user: { id: "-1" } }, process.env.JWT_SECRET);

      const promise = authenticationMiddleware(ctx, req, () => {});

      expect(promise).to.be.rejectedWith("Invalid access token.");
    });
  });

  context("when the user is found", function() {
    it("adds the user to the request", async function() {
      const user = await new UserMock().create();
      req.headers.authorization = jwt.sign({ user }, process.env.JWT_SECRET);

      await authenticationMiddleware(ctx, req, () => {});

      expect(req.user).to.eql(user);
    });
  });
});
