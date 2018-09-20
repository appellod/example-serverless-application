import { expect } from "chai";
import * as Chance from "chance";

import { HttpContext, IFunctionRequest, queryToJsonMiddleware } from "../../../../src/common/serverless";
import { FunctionRequestMock, HttpContextMock,  } from "../../../../src/common/serverless/mocks";

const chance = new Chance();

describe("common/serverless/middleware/error.ts", function() {
  let ctx: HttpContext;
  let req: IFunctionRequest;

  beforeEach(function() {
    ctx = new HttpContextMock();
    req = new FunctionRequestMock();
  });

  it("parses the query parameter from JSON into base query properties", async function() {
    const hash = chance.hash();
    req.query = { query: `{"hash":"${hash}"}`};

    await queryToJsonMiddleware(ctx, req, () => {});

    expect(req.query).to.eql({ hash });
  });
});
