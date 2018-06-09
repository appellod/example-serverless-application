import * as chai from "chai";

import { Token, TokenDocument, UserDocument } from "../../mongoose";

const chaiHttp = require("chai-http");

export class ApiHelper {
  public host: string;
  public port: string;

  constructor() {
    chai.use(chaiHttp);

    this.host = process.env.SERVER_HOST;
    this.port = process.env.SERVER_PORT;
  }

  /**
   * Send a request to the test API.
   * @param method The HTTP method. (ex: "get", "post", "put", "delete")
   * @param path The relative path of the API endpoint. (ex: "/users")
   * @param params An object of all the key-value pairs to send as the query or body parameters.
   * @param user The user to send request with. Pass null to not supply token in header.
   */
  public async request(method: string, path: string, params: any, user?: UserDocument): Promise<ChaiHttp.Response> {
    let token: TokenDocument;

    if (user) {
      token = await Token.create({
        expiresAt: Token.getExpirationDate(),
        userId: user._id
      });
    }

    // if using GET, add params to query string and return proper HTTP function
    if (method === "get" || method === "delete") {
      if (params) {
        const query = encodeURIComponent(JSON.stringify(params));
        path += "?query=" + query;
      }
    }

    const request = <ChaiHttp.Request> (<any> chai.request(this.host + ":" + this.port))[method]("/v1" + path);

    if (token) {
      request.set("Authorization", "Bearer " + token._id);
    }

    if ((method === "post" || method === "put") && params) {
      request.send(params);
    }

    return <Promise<ChaiHttp.Response>> new Promise((resolve) => {
      request.end((err, response) => resolve(response));
    });
  }
}
