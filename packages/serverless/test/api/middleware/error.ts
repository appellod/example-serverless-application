import { FunctionRequest, HttpContext, HttpError } from "@example/azura";
import { FunctionRequestMock, HttpContextMock,  } from "@example/azura/mocks";
import { expect } from "chai";
import * as Chance from "chance";

import { errorMiddleware } from "../../../src/api/middleware";

const chance = new Chance();

describe("middleware/error.ts", function() {
  let ctx: HttpContext;
  let req: FunctionRequest;

  beforeEach(function() {
    ctx = new HttpContextMock();
    req = new FunctionRequestMock();
  });

  it("returns caught errors in the response", async function() {
    const hash = chance.hash();
    const next = () => {
      throw new Error(hash);
    };

    await errorMiddleware(ctx, req, next);

    expect(ctx.res.body).to.eql({ error: hash });
    expect(ctx.res.status).to.eql(400);
  });

  it("uses an HttpError's status code", async function() {
    const hash = chance.hash();
    const next = () => {
      throw new HttpError(404, hash);
    };

    await errorMiddleware(ctx, req, next);

    expect(ctx.res.body).to.eql({ error: hash });
    expect(ctx.res.status).to.eql(404);
  });
});
