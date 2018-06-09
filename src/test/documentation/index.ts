import * as chai from "chai";
import * as nock from "nock";

const index = require("../");

const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

describe("documentation/index.ts", function() {
  describe("GET /apidoc/index.html", function() {
    it("does not return a response", async function() {
      const method = "get";
      const path = "/apidoc/index.html";
      const params: any = null;

      const request = <ChaiHttp.Request> chai.request(host + ":" + port).get(path);

      const res = <ChaiHttp.Response> await new Promise((resolve) => {
        request.end((err, response) => resolve(response));
      });

      expect(res).to.eql(undefined);
    });
  });

  describe("GET /login.html", function() {
    it("returns a 200 status code", async function() {
      const method = "get";
      const path = "/login.html";
      const params: any = null;

      const request = <ChaiHttp.Request> chai.request(host + ":" + port).get(path);

      const res = <ChaiHttp.Response> await new Promise((resolve) => {
        request.end((err, response) => resolve(response));
      });

      expect(res.status).to.eql(200);
    });
  });
});
