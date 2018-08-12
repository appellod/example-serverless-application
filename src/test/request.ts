import * as chai from "chai";

import { Token, UserDocument } from "../mongoose";

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

/**
 * Send a request to the test API.
 * @param method The HTTP method. (ex: "get", "post", "put", "delete")
 * @param path The relative path of the API endpoint. (ex: "/users")
 * @param params An object of all the key-value pairs to send as the query or body parameters.
 * @param user The user to send request with. Pass null to not supply token in header.
 */
export async function request(method: string, path: string, params: any, user?: UserDocument): Promise<ChaiHttp.Response> {
  // if using GET, add params to query string and return proper HTTP function
  if ((method === "get" || method === "delete") && params) {
      path += "?query=" + encodeURIComponent(JSON.stringify(params));
  }

  const host = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;
  const req = (<any> chai.request(`http://${host}:${port}`))[method](path);

  if (user) {
    const token = await Token.create({ userId: user._id });
    req.set("Authorization", `Bearer ${token._id}`);
  }

  if ((method === "post" || method === "put") && params) {
    return req.send(params);
  } else {
    return req.send();
  }
}
