import { User } from "@example/postgres";
import { HttpMethod, FunctionRequest } from "../";

export class FunctionRequestMock implements FunctionRequest {
  public body: any;
  public headers: { [s: string]: string; };
  public method: HttpMethod;
  public originalUrl: string;
  public params: { [s: string]: any; };
  public query: { [s: string]: any; };
  public rawbody: any;
  public user: User;

  constructor(params?: Partial<FunctionRequest>) {
    this.body = {};
    this.headers = {};
    this.params = {};
    this.query = {};

    Object.assign(this, params);
  }
}
