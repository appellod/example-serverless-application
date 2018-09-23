import * as chai from "chai";
import * as jwt from "jsonwebtoken";

import { User } from "../src/common/postgres";

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

export class RequestHelper {
  /**
   * Send a request to the test API.
   * @param method The HTTP method. (ex: "get", "post", "put", "delete")
   * @param path The relative path of the API endpoint. (ex: "/users")
   * @param params An object of all the key-value pairs to send as the query or body parameters.
   * @param user The user to send request with. Pass null to not supply token in header.
   */
  public async request(method: string, path: string, params?: any, user?: User): Promise<ChaiHttp.Response> {
    // if using GET, add params to query string and return proper HTTP function
    if ((method === "get" || method === "delete") && params) {
        path += "?query=" + encodeURIComponent(JSON.stringify(params));
    }

    const req = (<any> chai.request(process.env.AZURE_FUNCTIONS_URL))[method](path);

    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      req.set("Authorization", `Bearer ${token}`);
    }

    return params ? req.send(params) : req.send();
  }
}
