import { FunctionResponse, HttpContext } from "../";

export class HttpContextMock implements HttpContext {
  public bindingData: any;
  public bindings: any;
  public invocationId: string;
  public log: {
    (...text: string[]): void;
    warn: (...text: string[]) => void;
    error: (...text: string[]) => void;
    info: (...text: string[]) => void;
    verbose: (...text: string[]) => void;
  };
  public res: FunctionResponse;

  constructor(params?: Partial<HttpContext>) {
    this.res = {
      body: {},
      headers: {},
      status: 200
    };

    Object.assign(this, params);
  }

  public done(err?: any, output?: { [s: string]: any }) {}
}
