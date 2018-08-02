import { IContext } from "../";

export async function authenticationMiddleware(ctx: IContext) {
  if (ctx.socket.user) {
    return;
  }

  throw new Error("This endpoint requires authorization.");
}
