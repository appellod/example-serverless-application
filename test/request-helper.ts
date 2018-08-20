import * as chai from "chai";
import { Server } from "http";

import { Token, UserDocument } from "../src/common/mongo";

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

export class RequestHelper {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  /**
   * Send a request to the test API.
   * @param method The HTTP method. (ex: "get", "post", "put", "delete")
   * @param path The relative path of the API endpoint. (ex: "/users")
   * @param params An object of all the key-value pairs to send as the query or body parameters.
   * @param user The user to send request with. Pass null to not supply token in header.
   */
  public async request(method: string, path: string, params: any, user?: UserDocument): Promise<ChaiHttp.Response> {
    // if using GET, add params to query string and return proper HTTP function
    if ((method === "get" || method === "delete") && params) {
        path += "?query=" + encodeURIComponent(JSON.stringify(params));
    }

    const req = (<any> chai.request(this.server))[method](path);

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
}
