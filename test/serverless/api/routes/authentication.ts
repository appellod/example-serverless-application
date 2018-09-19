// import { expect } from "chai";
// import * as jwt from "jsonwebtoken";
// import * as nock from "nock";

// import { User } from "../../../../src/common/postgres";
// import { koa } from "../../../../src/microservices/authentication";
// import { UserMock } from "../../../common/postgres/mocks";
// import { RequestHelper } from "../../../request-helper";

// const requestHelper = new RequestHelper(koa.server);

// describe("microservices/authentication/routes/authentication.ts", function() {
//   let user: User;

//   beforeEach(async function() {
//     user = await UserMock.insert();
//   });

//   describe("GET /v1/authentication/availability", function() {
//     it("returns a success response", async function() {
//       const method = "get";
//       const path = "/v1/authentication/availability";
//       const params = {
//         email: "available@example.com"
//       };

//       const res = await requestHelper.request(method, path, params, null);

//       expect(res.status).to.eql(200);
//     });
//   });

//   describe("POST /v1/authentication/signup", function() {
//     it("returns a success response", async function() {
//       const method = "post";
//       const path = "/v1/authentication/signup";
//       const params = {
//         email: "user@example.com",
//         password: "password"
//       };

//       const res = await requestHelper.request(method, path, params, null);

//       expect(res.status).to.eql(200);
//     });
//   });

//   describe("POST /v1/authentication/login", function() {
//     beforeEach(async function() {
//       user = await UserMock.insert({ password: "password" });
//     });

//     it("returns a success response", async function() {
//       const method = "post";
//       const path = "/v1/authentication/login";
//       const params = {
//         email: user.email,
//         password: "password"
//       };

//       const res = await requestHelper.request(method, path, params, null);

//       expect(res.status).to.eql(200);
//     });
//   });

//   describe("DELETE /v1/authentication/logout", function() {
//     it("returns a success response", async function() {
//       const method = "delete";
//       const path = "/v1/authentication/logout";
//       const params: any = null;

//       const res = await requestHelper.request(method, path, params, user);

//       expect(res.status).to.eql(200);
//     });
//   });

//   describe("POST /v1/authentication/request-password-reset", function() {
//     beforeEach(async function() {
//       nock(/mailgun\.net/)
//         .post(/.*/)
//         .reply(200, {
//           id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
//           message: "Queued. Thank you."
//         });
//     });

//     it("returns a success response", async function() {
//       const method = "post";
//       const path = "/v1/authentication/request-password-reset";
//       const params = {
//         email: user.email
//       };

//       const res = await requestHelper.request(method, path, params, null);

//       expect(res.status).to.eql(200);
//     });
//   });

//   describe("POST /v1/authentication/reset-password", function() {
//     beforeEach(async function() {
//       nock(/mailgun\.net/)
//         .post(/.*/)
//         .reply(200, {
//           id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
//           message: "Queued. Thank you."
//         });

//       user = await user.requestPasswordReset();
//     });

//     it("returns a success response", async function() {
//       const method = "post";
//       const path = "/v1/authentication/reset-password";
//       const params = {
//         password: "newpassword",
//         reset_hash: user.reset_hash
//       };

//       const res = await requestHelper.request(method, path, params, user);

//       expect(res.status).to.eql(200);
//     });
//   });

//   describe("POST /authentication/token", function() {
//     let token: string;

//     beforeEach(async function() {
//       token = jwt.sign({ user }, process.env.JWT_SECRET);
//     });

//     it("returns a success response", async function() {
//       const method = "post";
//       const path = "/v1/authentication/token";
//       const params = { token };

//       const res = await requestHelper.request(method, path, params, user);

//       expect(res.status).to.eql(200);
//     });
//   });
// });
