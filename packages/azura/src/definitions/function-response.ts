import { HttpStatusCode } from "./";

export interface FunctionResponse {
  body?: any;
  headers?: {
    "content-type"?: string;
    "content-length"?: HttpStatusCode | number;
    "content-disposition"?: string;
    "content-encoding"?: string;
    "content-language"?: string;
    "content-range"?: string;
    "content-location"?: string;
    "content-md5"?: Buffer;
    "expires"?: Date;
    "last-modified"?: Date;
    "set-cookie"?: string;
    [s: string]: any;
  };
  isRaw?: boolean;
  status?: number;
}
