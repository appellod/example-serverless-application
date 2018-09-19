import { User } from "../../../../src/common/postgres";
import { HttpMethod, IFunctionRequest } from "../../../../src/common/serverless";

export class FunctionRequestMock implements IFunctionRequest {
  public body: any;
  public headers: { [s: string]: string; };
  public method: HttpMethod;
  public originalUrl: string;
  public params: { [s: string]: any; };
  public query: { [s: string]: any; };
  public rawbody: any;
  public user: User;

  constructor(params?: Partial<IFunctionRequest>) {
    this.body = {};
    this.headers = {};
    this.params = {};
    this.query = {};

    Object.assign(this, params);
  }
}
