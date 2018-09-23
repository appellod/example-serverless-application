import * as fs from "fs";
import * as mime from "mime";
import * as path from "path";
import { promisify } from "util";

import { HttpContext } from "../";

export interface SendOptions {
  root?: string;
}

/**
 * Serves static files from the given root directory.
 */
export async function send(ctx: HttpContext, pathname: string, options: SendOptions) {
  try {
    const root = options.root ? options.root : "";
    const file = path.join(root, path.normalize(pathname));

    const readFile = promisify(fs.readFile);
    const data = await readFile(file);

    ctx.res.body = data;
    ctx.res.headers = { "content-type": mime.getType(file) };
    ctx.res.status = 200;
  } catch (e) {
    ctx.res.status = 404;
  }
}
