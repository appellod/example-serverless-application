import { FunctionResponse } from "./";

export interface HttpContext {
  bindingData: any;
  bindings: any;
  invocationId: string;
  log: {
    (...text: string[]): void;
    warn: (...text: string[]) => void;
    error: (...text: string[]) => void;
    info: (...text: string[]) => void;
    verbose: (...text: string[]) => void;
  };
  res: FunctionResponse;

  done(err?: any, output?: { [s: string]: any }): void;
}
