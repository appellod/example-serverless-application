import { expect } from "chai";

import { RequestHelper } from "../request-helper";

const requestHelper = new RequestHelper();

describe("GET /index.html", function() {
  it("returns a success response", async function() {
    const method = "get";
    const path = "/index.html";

    const res = await requestHelper.request(method, path);

    expect(res.status).to.eql(200);
  });
});
