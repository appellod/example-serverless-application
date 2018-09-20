import { expect } from "chai";
import * as jwt from "jsonwebtoken";

import { authenticationMiddleware, HttpContext, IFunctionRequest } from "../../../../src/common/serverless";
import { FunctionRequestMock, HttpContextMock,  } from "../../../../src/common/serverless/mocks";
import { UserMock } from "../../../../src/common/postgres/mocks";

describe("common/serverless/middleware/authentication.ts", function() {
  let ctx: HttpContext;
  let req: IFunctionRequest;

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
