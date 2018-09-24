import { User } from "@example/postgres";

import { HttpMethod } from "./";

export interface FunctionRequest {
  body: { [s: string]: any; };
  headers: { [s: string]: string; };
  method: HttpMethod;
  originalUrl: string;
  params: { [s: string]: any; };
  query: { [s: string]: any; };
  rawbody: any;
  session?: any;
  user?: User;
}
