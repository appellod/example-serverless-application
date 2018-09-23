import { FunctionRequest, HttpContext } from "@example/azura";
import { FunctionRequestMock, HttpContextMock,  } from "@example/azura/mocks";
import { expect } from "chai";
import * as Chance from "chance";

import { queryToJsonMiddleware } from "../../../src/api/middleware";

const chance = new Chance();

describe("middleware/error.ts", function() {
  let ctx: HttpContext;
  let req: FunctionRequest;

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
