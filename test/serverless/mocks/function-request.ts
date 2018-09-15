import { HttpMethod, IFunctionRequest } from "../../../src/serverless/interfaces";

export class FunctionRequestMock implements IFunctionRequest {
  public body: any;
  public headers: { [s: string]: string; };
  public method: HttpMethod;
  public originalUrl: string;
  public query: { [s: string]: string; };
  public rawbody: any;

  constructor(params?: Partial<IFunctionRequest>) {
    Object.assign(this, params);
  }
}
